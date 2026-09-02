/**
 * Runtime accessibility gate. Requires a server already running (default
 * http://localhost:3000) — start one with `npm run dev` or `npm start`.
 *
 * Checks, each mapped to a defect this project actually shipped:
 *
 *  1. Text contrast (WCAG AA: 4.5:1 body, 3:1 large text)
 *     The final CTA shipped at 1.05:1 — white text on a cream background —
 *     because a dark-section background never applied.
 *
 *  2. Focusable elements inside hidden containers
 *     The closed mobile menu kept tabindex=0 links, so keyboard users tabbed
 *     into an invisible menu.
 *
 *  3. Page length budget
 *     The homepage reached 16.8 screens before being trimmed.
 *
 * Run: npm run check:a11y
 */
import puppeteer from "puppeteer";
import fs from "node:fs";
import path from "node:path";

/**
 * Baseline: this codebase has pre-existing contrast debt in its muted-text
 * tokens (e.g. --color-text-secondary at 4.21:1 on the cream background, and
 * 10px navy-300 labels at 2.59:1). Fixing those means re-tuning the palette,
 * which is a design decision rather than a cleanup.
 *
 * So the gate fails on NEW problems only, and tells you when a baselined one is
 * fixed so the baseline can shrink. Regenerate with:
 *   node scripts/check-a11y.mjs --update-baseline
 */
const BASELINE_PATH = path.join(process.cwd(), "scripts", "a11y-baseline.json");
const UPDATE_BASELINE = process.argv.includes("--update-baseline");
const baseline = fs.existsSync(BASELINE_PATH)
  ? new Set(JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8")))
  : new Set();

const BASE = process.env.CHECK_BASE_URL || "http://localhost:3000";
const ROUTES = ["/", "/product", "/solutions", "/pricing", "/demo", "/skills-gap-diagnostic"];
const MAX_HOME_SCREENS = 14;

const failures = [];
// Load/render errors are never baselined — a broken page always fails the gate.
const hardFailures = [];

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

for (const route of ROUTES) {
  let response;
  try {
    response = await page.goto(BASE + route, { waitUntil: "networkidle2", timeout: 60000 });
  } catch {
    hardFailures.push(`${route}  did not finish loading`);
    continue;
  }

  // A page that 500s or renders almost nothing must never pass silently. Without
  // this, a broken build scans zero text nodes and the gate reports success.
  const status = response?.status() ?? 0;
  if (status >= 400) {
    hardFailures.push(`${route}  HTTP ${status}`);
    continue;
  }
  const textLength = await page.evaluate(() => (document.querySelector("main")?.innerText || "").trim().length);
  if (textLength < 200) {
    hardFailures.push(`${route}  rendered only ${textLength} chars of text — page is empty or broken`);
    continue;
  }

  // Open the mega menus before scanning. They are a large surface that only
  // exists after interaction, so a scan of the default page state never saw
  // them — two contrast failures sat in the Solutions panel undetected.
  await page.evaluate(async () => {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    for (const label of ["Product", "Solutions"]) {
      const btn = Array.from(document.querySelectorAll("header button")).find(
        (b) => b.textContent.trim() === label
      );
      if (!btn) continue;
      btn.click();
      await wait(250);
      // reveal every hover preview so their contents are scanned too
      const panel = document.querySelector('header [class*="w-[720px]"]');
      if (panel) {
        for (const a of panel.querySelectorAll("a")) {
          a.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
          await wait(80);
        }
      }
      await wait(150);
    }
  });

  const result = await page.evaluate(() => {
    const luminance = (rgb) => {
      const parts = (rgb.match(/[\d.]+/g) || []).slice(0, 3).map(Number).map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      if (parts.length < 3) return null;
      return 0.2126 * parts[0] + 0.7152 * parts[1] + 0.0722 * parts[2];
    };

    const parseRgba = (s) => {
      const p = (s.match(/[\d.]+/g) || []).map(Number);
      if (p.length < 3) return null;
      return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
    };

    // Translucent layers must be composited over what sits behind them. Treating
    // rgba(255,255,255,0.1) as opaque white reports white-on-dark as 1:1.
    const effectiveBg = (el) => {
      const layers = [];
      let n = el;
      while (n && n !== document.documentElement) {
        const c = parseRgba(getComputedStyle(n).backgroundColor);
        if (c && c.a > 0) {
          layers.push(c);
          if (c.a >= 0.999) break; // fully opaque: nothing below it shows through
        }
        n = n.parentElement;
      }
      const base = parseRgba(getComputedStyle(document.body).backgroundColor) || { r: 255, g: 255, b: 255, a: 1 };
      if (!layers.length || layers[layers.length - 1].a < 0.999) layers.push({ ...base, a: 1 });

      // composite bottom -> top
      let out = layers[layers.length - 1];
      for (let i = layers.length - 2; i >= 0; i--) {
        const top = layers[i];
        out = {
          r: top.r * top.a + out.r * (1 - top.a),
          g: top.g * top.a + out.g * (1 - top.a),
          b: top.b * top.a + out.b * (1 - top.a),
          a: 1,
        };
      }
      return `rgb(${out.r}, ${out.g}, ${out.b})`;
    };

    const lowContrast = [];
    // header included so the opened mega menus are covered, not just <main>
    const sel = ["main", "header"]
      .flatMap((root) => ["p", "span", "a", "h1", "h2", "h3", "h4", "li", "button"].map((t) => `${root} ${t}`))
      .join(", ");
    const nodes = document.querySelectorAll(sel);

    for (const el of nodes) {
      const text = (el.textContent || "").trim();
      if (!text || text.length < 4) continue;
      // only leaf-ish nodes, so we don't score wrapper elements
      if (el.children.length > 0) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || cs.display === "none") continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      // skip anything whose ancestor chain is transparent-by-design (opacity 0)
      let op = 1, n = el;
      while (n && n !== document.documentElement) { op *= parseFloat(getComputedStyle(n).opacity || "1"); n = n.parentElement; }
      if (op < 0.95) continue;

      const bgStr = effectiveBg(el);
      const bgC = parseRgba(bgStr);
      const fgC = parseRgba(cs.color);
      if (!bgC || !fgC) continue;
      // a translucent text colour also sits on top of the background
      const fgComposited = {
        r: fgC.r * fgC.a + bgC.r * (1 - fgC.a),
        g: fgC.g * fgC.a + bgC.g * (1 - fgC.a),
        b: fgC.b * fgC.a + bgC.b * (1 - fgC.a),
      };
      const fg = luminance(`rgb(${fgComposited.r},${fgComposited.g},${fgComposited.b})`);
      const bg = luminance(bgStr);
      if (fg === null || bg === null) continue;
      const hi = Math.max(fg, bg), lo = Math.min(fg, bg);
      const ratio = (hi + 0.05) / (lo + 0.05);

      const size = parseFloat(cs.fontSize);
      const bold = parseInt(cs.fontWeight, 10) >= 700;
      const isLarge = size >= 24 || (size >= 18.66 && bold);
      const min = isLarge ? 3 : 4.5;

      if (ratio < min) {
        lowContrast.push({ text: text.slice(0, 55), ratio: +ratio.toFixed(2), min, size });
      }
    }

    // focusable descendants of hidden containers
    const hiddenFocusable = [];
    for (const container of document.querySelectorAll('[aria-hidden="true"], [inert]')) {
      const f = container.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])');
      for (const el of f) {
        if (el.closest("[inert]")) continue; // inert correctly removes from tab order
        hiddenFocusable.push((el.textContent || el.tagName).trim().slice(0, 40));
      }
    }

    return {
      lowContrast,
      hiddenFocusable,
      scrollHeight: document.body.scrollHeight,
      viewportHeight: window.innerHeight,
    };
  });

  for (const c of result.lowContrast) {
    failures.push(`${route}  contrast ${c.ratio}:1 (needs ${c.min}:1, ${Math.round(c.size)}px)  "${c.text}"`);
  }
  for (const h of result.hiddenFocusable) {
    failures.push(`${route}  focusable element inside a hidden container: "${h}"`);
  }
  if (route === "/") {
    const screens = result.scrollHeight / result.viewportHeight;
    if (screens > MAX_HOME_SCREENS) {
      failures.push(`/  homepage is ${screens.toFixed(1)} screens (budget ${MAX_HOME_SCREENS})`);
    } else {
      console.log(`  homepage length ${screens.toFixed(1)} screens (budget ${MAX_HOME_SCREENS})`);
    }
  }
  console.log(`  checked ${route}`);
}

await browser.close();

// Contrast ratios drift by hundredths between runs; key on the route + message
// without the exact ratio so the baseline stays stable.
const key = (f) => f.replace(/contrast [\d.]+:1/, "contrast X").trim();

if (hardFailures.length) {
  console.error("\nAccessibility gate failed — pages did not render:\n");
  for (const f of hardFailures) console.error("  " + f);
  console.error("\nFix the build before contrast results mean anything.\n");
  process.exit(1);
}

if (UPDATE_BASELINE) {
  const keys = [...new Set(failures.map(key))].sort();
  fs.writeFileSync(BASELINE_PATH, JSON.stringify(keys, null, 2) + "\n", "utf8");
  console.log(`\nBaseline written: ${keys.length} known problem(s) recorded.`);
  console.log("These are accepted debt. New problems will fail the gate.\n");
  process.exit(0);
}

const current = failures.map((f) => ({ raw: f, k: key(f) }));
const regressions = current.filter((f) => !baseline.has(f.k));
const stillPresent = new Set(current.map((f) => f.k));
const fixed = [...baseline].filter((b) => !stillPresent.has(b));

if (fixed.length) {
  console.log(`\n${fixed.length} baselined problem(s) now fixed — rerun with --update-baseline to shrink the baseline:`);
  for (const f of fixed.slice(0, 10)) console.log("  fixed: " + f);
}

if (regressions.length) {
  console.error("\nAccessibility gate failed — new problems not in the baseline:\n");
  for (const f of regressions) console.error("  " + f.raw);
  console.error(`\n${regressions.length} new problem(s). ${baseline.size} known issue(s) baselined.\n`);
  process.exit(1);
}

console.log(`\ncheck:a11y — no new problems. ${baseline.size} known issue(s) still baselined.`);
