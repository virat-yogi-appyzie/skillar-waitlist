/**
 * Fails the build when the code references a CSS custom property or a project
 * "semantic" class that is never defined.
 *
 * Why this exists: the final CTA shipped with white text on a cream background at
 * 1.05:1 contrast because `--atmo-cta` and `.section-dark` were referenced but
 * defined nowhere. Both resolved silently to nothing, so the section simply had
 * no dark background. Nothing in the toolchain complained.
 *
 * Run: npm run check:css
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const CSS_FILES = [path.join(SRC, "app", "globals.css")];

// Prefixes owned by this project (as opposed to Tailwind utilities). A class
// starting with one of these must resolve to a definition in the CSS.
const SEMANTIC_PREFIXES = ["section-", "btn-", "label-mono", "card-", "stat-"];

// Custom properties supplied by the framework/browser rather than our CSS.
const EXTERNAL_VARS = new Set(["--tw-", "--font-geist", "--radix-", "--shiki-"]);

/**
 * Dead components left over from the previous "Editorial Luxury" waitlist design.
 * Verified unreachable: nothing imports them. They reference an entire retired
 * token set (--space-*, --bg-card, .btn--primary, ...), so linting them is noise.
 *
 * Delete these files and this list should go with them.
 */
const LEGACY_UNREFERENCED = [
  "src/components/Waitlist.tsx",
  "src/components/Hero.tsx",
  "src/components/Features.tsx",
  "src/components/home/CapabilityGraph.tsx",
  "src/components/home/LearningLoop.tsx",
  "src/components/ui/discovery-combobox.tsx",
].map((p) => path.normalize(p));

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (/\.(tsx?|jsx?|css)$/.test(entry.name)) out.push(p);
  }
  return out;
}

const cssText = CSS_FILES.filter(fs.existsSync).map((f) => fs.readFileSync(f, "utf8")).join("\n");

const definedVars = new Set([...cssText.matchAll(/(--[a-zA-Z0-9-]+)\s*:/g)].map((m) => m[1]));
const definedClasses = new Set([...cssText.matchAll(/\.([a-zA-Z0-9_-]+)/g)].map((m) => m[1]));

// next/font injects its custom properties at runtime via `variable: "--font-x"`,
// so they are legitimately defined even though no CSS file declares them.
const allSrc = walk(SRC).map((f) => fs.readFileSync(f, "utf8")).join("\n");
for (const m of allSrc.matchAll(/variable\s*:\s*["'`](--[a-zA-Z0-9-]+)["'`]/g)) {
  definedVars.add(m[1]);
}

const problems = [];

for (const file of walk(SRC)) {
  const text = fs.readFileSync(file, "utf8");
  const rel = path.relative(ROOT, file);
  if (LEGACY_UNREFERENCED.includes(rel)) continue;

  // 1. var(--x) references that are never defined
  for (const m of text.matchAll(/var\(\s*(--[a-zA-Z0-9-]+)/g)) {
    const name = m[1];
    if (definedVars.has(name)) continue;
    if ([...EXTERNAL_VARS].some((p) => name.startsWith(p))) continue;
    const line = text.slice(0, m.index).split("\n").length;
    problems.push(`${rel}:${line}  undefined CSS variable  ${name}`);
  }

  // 2. project-owned classes that are never defined
  if (file.endsWith(".css")) continue;
  for (const m of text.matchAll(/className\s*=\s*[{"'`]([^"'`}]*)/g)) {
    for (const cls of m[1].split(/\s+/)) {
      const bare = cls.replace(/^[a-z-]+:/, "").trim(); // strip responsive/state prefix
      if (!bare) continue;
      if (!SEMANTIC_PREFIXES.some((p) => bare.startsWith(p))) continue;
      if (definedClasses.has(bare)) continue;
      const line = text.slice(0, m.index).split("\n").length;
      problems.push(`${rel}:${line}  undefined project class  .${bare}`);
    }
  }
}

if (problems.length) {
  console.error("\nDangling CSS references (these resolve to nothing at runtime):\n");
  for (const p of [...new Set(problems)]) console.error("  " + p);
  console.error(`\n${new Set(problems).size} problem(s).\n`);
  process.exit(1);
}

console.log("check:css — all CSS variables and project classes resolve.");
