"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import {
  NEEDS,
  RATING_AREAS,
  RATING_DESCS,
  SECTORS,
  STAGES,
  snapshotLabel,
} from "@/lib/event-intake-shared";
import { submitEventIntake, type EventIntakeResult } from "@/lib/event-intake";

/**
 * The Eureka founder intake: three steps (details, self-rating, review) and
 * a success screen, with a live snapshot panel that assembles the founder's
 * readiness profile as they type.
 *
 * Ported from the approved standalone prototype with its behavior intact
 * (autosave, keyboard rating, review-before-submit) and its honesty fixed:
 * the score is framed as a self-assessment snapshot rather than a diagnosis,
 * the fake LIVE badge and invented reference number are gone (the reference
 * shown is the stored submission's), and the success screen promises exactly
 * what the backend does — an account on learning.skillar.ai with a roadmap
 * for the founder's chosen track, credentials by email, follow-up on
 * WhatsApp.
 */

const RING_C = 326.73; // ring circumference (r = 52)
const STORE_KEY = "skillar-eureka-intake-v1";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = {
  name: string;
  startup: string;
  email: string;
  phone: string;
  stage: string | null;
  need: string | null;
  sector: string | null;
  ratings: (number | null)[];
};

const EMPTY: FormState = {
  name: "",
  startup: "",
  email: "",
  phone: "",
  stage: null,
  need: null,
  sector: null,
  ratings: [null, null, null, null, null, null],
};

/* ── Inline icons (single stroke family, from the prototype) ─────────── */

function Icon({ d, boxed = false }: { d: React.ReactNode; boxed?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={boxed ? 1.8 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {d}
    </svg>
  );
}
const iconArrR = <Icon d={<path d="M4 12h15M13 5l7 7-7 7" />} />;
const iconArrL = <Icon d={<path d="M20 12H5M11 5l-7 7 7 7" />} />;
const iconMail = (
  <Icon
    boxed
    d={
      <>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="M3.5 7.5 12 13.5l8.5-6" />
      </>
    }
  />
);
const iconPhone = (
  <Icon
    boxed
    d={<path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a1.5 1.5 0 0 1-1.5 1.5A15.5 15.5 0 0 1 3.5 5.5 1.5 1.5 0 0 1 5 4z" />}
  />
);
const NEED_ICONS: Record<string, React.ReactNode> = {
  deck: <Icon boxed d={<path d="M4 5h16M6 5v9h12V5M12 14v3M9 20l3-3 3 3" />} />,
  chart: <Icon boxed d={<path d="M5 20v-6M11 20V8M17 20V10M3 20h18" />} />,
  mic: (
    <Icon
      boxed
      d={
        <>
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
        </>
      }
    />
  ),
  compass: (
    <Icon
      boxed
      d={
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M15.5 8.5 13.4 13.4 8.5 15.5l2.1-4.9z" />
        </>
      }
    />
  ),
};
const iconSave = <Icon d={<path d="M5 12l4 4 9-9" />} />;

/* ── Component ───────────────────────────────────────────────────────── */

export default function EurekaIntake() {
  const [s, setS] = useState<FormState>(EMPTY);
  const [step, setStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showRateErr, setShowRateErr] = useState(false);
  const [missing, setMissing] = useState<number[]>([]);
  const [hover, setHover] = useState<{ q: number; v: number } | null>(null);
  const [saveNote, setSaveNote] = useState("Draft auto-saves as you type");
  const [submitErr, setSubmitErr] = useState<string | null>(null);
  const [result, setResult] = useState<EventIntakeResult | null>(null);
  const [pending, startTransition] = useTransition();
  const restored = useRef(false);
  const qRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ── Validation ── */
  const valid = useMemo(
    () => ({
      name: s.name.trim().length > 1,
      startup: s.startup.trim().length > 0,
      email: EMAIL_RE.test(s.email.trim()),
      phone: (() => {
        const d = s.phone.replace(/\D/g, "");
        return d.length >= 8 && d.length <= 15;
      })(),
      stage: Boolean(s.stage),
      need: Boolean(s.need),
    }),
    [s]
  );
  const requiredKeys = ["name", "startup", "email", "phone", "stage", "need"] as const;

  /* ── Score ── */
  const ratedValues = s.ratings.filter((v): v is number => v !== null);
  const ratedCount = ratedValues.length;
  const score = ratedCount
    ? Math.round((ratedValues.reduce((a, b) => a + b, 0) / ratedCount) * 20)
    : 0;
  const label = snapshotLabel(score);

  const doneUnits =
    requiredKeys.filter((k) => valid[k]).length + ratedCount;
  const pct = Math.round((doneUnits / 12) * 100);

  const insight = useMemo(() => {
    const bits: string[] = [];
    if (s.stage) bits.push(s.stage);
    if (s.need) bits.push(`${s.need} track`);
    if (ratedCount === 6) {
      const min = Math.min(...(s.ratings as number[]));
      bits.push(`First focus: ${RATING_AREAS[s.ratings.indexOf(min)].title}`);
    }
    return bits.length
      ? bits.join(" · ")
      : "Start answering. Your snapshot builds here as you go.";
  }, [s, ratedCount]);

  /* ── Autosave + restore ── */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const d = JSON.parse(raw) as Partial<FormState>;
        setS((prev) => ({
          ...prev,
          name: typeof d.name === "string" ? d.name : "",
          startup: typeof d.startup === "string" ? d.startup : "",
          email: typeof d.email === "string" ? d.email : "",
          phone: typeof d.phone === "string" ? d.phone : "",
          stage: typeof d.stage === "string" ? d.stage : null,
          need: typeof d.need === "string" ? d.need : null,
          sector: typeof d.sector === "string" ? d.sector : null,
          ratings:
            Array.isArray(d.ratings) && d.ratings.length === 6
              ? d.ratings.map((v) => (Number.isInteger(v) && (v as number) >= 1 && (v as number) <= 5 ? (v as number) : null))
              : [null, null, null, null, null, null],
        }));
        setSaveNote("Draft restored");
      }
    } catch {
      /* storage unavailable; the form still works */
    }
    restored.current = true;
  }, []);

  useEffect(() => {
    if (!restored.current || result) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(STORE_KEY, JSON.stringify(s));
        setSaveNote(
          "Draft saved · " +
            new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        );
      } catch {
        /* ignore */
      }
    }, 350);
    return () => clearTimeout(t);
  }, [s, result]);

  /* ── Helpers ── */
  const set = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setS((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setRating = (i: number, v: number) => {
    setS((prev) => {
      const ratings = [...prev.ratings];
      ratings[i] = v;
      return { ...prev, ratings };
    });
    setShowRateErr(false);
    setMissing((m) => m.filter((x) => x !== i));
  };

  const goStep = (n: number) => {
    setStep(n);
    setMaxStep((m) => Math.max(m, n));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateStep1 = () => {
    const nextTouched = { ...touched };
    requiredKeys.forEach((k) => (nextTouched[k] = true));
    setTouched(nextTouched);
    const firstBad = requiredKeys.find((k) => !valid[k]);
    if (firstBad) {
      document
        .getElementById(`f-${firstBad}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  };

  const validateRatings = () => {
    const miss = s.ratings
      .map((v, i) => (v === null ? i : null))
      .filter((v): v is number => v !== null);
    if (miss.length) {
      setShowRateErr(true);
      setMissing(miss);
      qRefs.current[miss[0]]?.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => setMissing([]), 1700);
      return false;
    }
    return true;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (result || pending) return;
    if (step === 1 && validateStep1()) goStep(2);
    else if (step === 2 && validateRatings()) goStep(3);
    else if (step === 3) file();
  };

  const file = () => {
    setSubmitErr(null);
    startTransition(async () => {
      const res = await submitEventIntake({
        founderName: s.name,
        startupName: s.startup,
        email: s.email,
        phone: s.phone,
        stage: s.stage || "",
        need: s.need || "",
        sector: s.sector,
        ratings: s.ratings.map((v) => v ?? 0),
      });
      if (!res.success) {
        setSubmitErr(res.message || "Something went wrong. Please try again.");
        return;
      }
      try {
        localStorage.removeItem(STORE_KEY);
      } catch {
        /* ignore */
      }
      setResult(res);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const reset = () => {
    setS(EMPTY);
    setTouched({});
    setResult(null);
    setSubmitErr(null);
    setStep(1);
    setMaxStep(1);
    setSaveNote("Draft auto-saves as you type");
  };

  const onQKeyDown = (i: number) => (e: React.KeyboardEvent) => {
    let v = s.ratings[i] ?? 0;
    if (e.key >= "1" && e.key <= "5") v = Number(e.key);
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") v = Math.min(5, (v || 0) + 1);
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") v = Math.max(1, (v || 2) - 1);
    else if (e.key === "Home") v = 1;
    else if (e.key === "End") v = 5;
    else return;
    e.preventDefault();
    setRating(i, v);
  };

  const badClass = (k: (typeof requiredKeys)[number]) =>
    touched[k] && !valid[k] ? " bad" : "";
  const validClass = (k: "name" | "startup" | "email" | "phone") =>
    valid[k] ? " valid" : "";

  const stepName = ["DETAILS", "READINESS", "REVIEW"][step - 1] || "DONE";
  const ringOffset = (v: number) => RING_C * (1 - Math.max(0, Math.min(100, v)) / 100);

  const strongest = ratedCount === 6 ? Math.max(...(s.ratings as number[])) : 0;
  const weakest = ratedCount === 6 ? Math.min(...(s.ratings as number[])) : 0;

  /* ── Render ── */
  return (
    <div className="evi">
      {/* Progress hairline on the viewport's top edge, same as the site's
          reading-progress bar. Lives outside the pill: the pill's transform
          would otherwise become its containing block. */}
      <span className="topprog" style={{ transform: `scaleX(${(result ? 100 : pct) / 100})` }} />

      <header className="topbar">
        <Link className="logo" href="/" aria-label="Skillar.ai home">
          {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size brand mark, no optimization needed */}
          <img src="/skillar-logo.svg" alt="Skillar.ai" />
        </Link>
        <span className="step-mini">{result ? "Done" : `0${step} / 03`}</span>
        <nav className="hsteps" aria-label="Progress">
          {["Details", "Readiness", "Review"].map((label, idx) => {
            const n = idx + 1;
            const locked = n > maxStep || Boolean(result);
            return (
              <button
                key={label}
                type="button"
                className={`hstep${!result && step === n ? " cur" : ""}${locked ? " locked" : ""}`}
                onClick={() => {
                  if (!locked) goStep(n);
                }}
              >
                <i>{`0${n}`}</i>
                {label}
              </button>
            );
          })}
        </nav>
        <div className="top-right">Eureka · Readiness check</div>
      </header>

      <div className="mbar">
        <div className="mbar-row">
          <span>{result ? "DONE" : `0${step} / 03 · ${stepName}`}</span>
          <span>
            SNAPSHOT <b>{ratedCount ? `${score} · ${label}` : `${ratedCount}/6`}</b>
          </span>
        </div>
        <div className="pbar">
          <i style={{ transform: `scaleX(${(result ? 100 : pct) / 100})` }} />
        </div>
      </div>

      <div className="layout">
        <main>
          <form onSubmit={onSubmit} noValidate>
            {/* ═══ STEP 1 · DETAILS ═══ */}
            {!result && (
              <section className={`step${step === 1 ? " active" : ""}`}>
                <div className="step-head">
                  <span className="eyebrow">01 · About you</span>
                  <h1>
                    How ready is your <em>pitch?</em>
                  </h1>
                  <p className="lead">
                    Three minutes for Eureka founders: tell us where you are, rate your own
                    readiness, and you get a{" "}
                    <strong>Skillar account in the Eureka founders group</strong>, with your
                    roadmap landing the moment it is ready, plus a follow-up{" "}
                    <strong>on WhatsApp</strong> instead of another email thread.
                  </p>
                </div>

                <div className="grid2">
                  <div className={`field${validClass("name")}${badClass("name")}`} id="f-name">
                    <label className="flabel" htmlFor="in-name">
                      Full name<span className="req">*</span>
                    </label>
                    <div className="inp">
                      <input
                        type="text"
                        id="in-name"
                        autoComplete="name"
                        placeholder="e.g. Ananya Sharma"
                        value={s.name}
                        onChange={(e) => set("name", e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                      />
                      <span className="ok" />
                    </div>
                    <p className="ferr">Please enter your full name.</p>
                  </div>
                  <div
                    className={`field${validClass("startup")}${badClass("startup")}`}
                    id="f-startup"
                  >
                    <label className="flabel" htmlFor="in-startup">
                      Startup name<span className="req">*</span>
                    </label>
                    <div className="inp">
                      <input
                        type="text"
                        id="in-startup"
                        autoComplete="organization"
                        placeholder="e.g. Copperline Labs"
                        value={s.startup}
                        onChange={(e) => set("startup", e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, startup: true }))}
                      />
                      <span className="ok" />
                    </div>
                    <p className="ferr">Please enter your startup&apos;s name.</p>
                  </div>
                </div>

                <div className="grid2">
                  <div className={`field${validClass("email")}${badClass("email")}`} id="f-email">
                    <label className="flabel" htmlFor="in-email">
                      Email<span className="req">*</span>
                    </label>
                    <div className="inp">
                      <input
                        type="email"
                        id="in-email"
                        autoComplete="email"
                        placeholder="you@startup.com"
                        value={s.email}
                        onChange={(e) => set("email", e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                      />
                      <span className="ok" />
                    </div>
                    <p className="hint">
                      {iconMail}Your account login details land here.
                    </p>
                    <p className="ferr">That email doesn&apos;t look right. Check for typos.</p>
                  </div>
                  <div className={`field${validClass("phone")}${badClass("phone")}`} id="f-phone">
                    <label className="flabel" htmlFor="in-phone">
                      Phone / WhatsApp<span className="req">*</span>
                    </label>
                    <div className="inp">
                      <input
                        type="tel"
                        id="in-phone"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="+91 98765 43210"
                        value={s.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                      />
                      <span className="ok" />
                    </div>
                    <p className="hint">{iconPhone}Include country code. We message here first.</p>
                    <p className="ferr">Enter a valid number with country code.</p>
                  </div>
                </div>

                <div className={`field${badClass("stage")}`} id="f-stage">
                  <span className="flabel">
                    Current stage<span className="req">*</span>
                  </span>
                  <div className="seg3" role="radiogroup" aria-label="Current stage">
                    {STAGES.map((st) => (
                      <button
                        key={st.value}
                        type="button"
                        className={`seg-btn${s.stage === st.value ? " sel" : ""}`}
                        aria-pressed={s.stage === st.value}
                        onClick={() => set("stage", st.value)}
                      >
                        <strong>{st.label}</strong>
                        <span>{st.sub}</span>
                      </button>
                    ))}
                  </div>
                  <p className="ferr">Pick the stage that fits best.</p>
                </div>

                <div className={`field${badClass("need")}`} id="f-need">
                  <span className="flabel">
                    What do you need most right now?<span className="req">*</span>
                  </span>
                  <div className="tiles" role="radiogroup" aria-label="Biggest need">
                    {NEEDS.map((n) => (
                      <button
                        key={n.value}
                        type="button"
                        className={`tile${s.need === n.value ? " sel" : ""}`}
                        aria-pressed={s.need === n.value}
                        onClick={() => set("need", n.value)}
                      >
                        {NEED_ICONS[n.icon]}
                        <span>
                          <strong>{n.label}</strong>
                          <span className="tsub">{n.sub}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="ferr">Choose one. This decides which roadmap you get.</p>
                </div>

                <div className="field" id="f-sector">
                  <span className="flabel">
                    Industry / sector{" "}
                    <span className="opt-tag">· optional, but it helps us match you</span>
                  </span>
                  <div className="chips" role="radiogroup" aria-label="Industry">
                    {SECTORS.map((sec) => (
                      <button
                        key={sec}
                        type="button"
                        className={`chip${s.sector === sec ? " sel" : ""}`}
                        aria-pressed={s.sector === sec}
                        onClick={() => set("sector", s.sector === sec ? null : sec)}
                      >
                        {sec}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="actions">
                  <span className="hint" style={{ margin: 0 }}>
                    Press <b>Enter</b> to continue
                  </span>
                  <button type="submit" className="btn">
                    Next: rate your readiness {iconArrR}
                  </button>
                </div>
              </section>
            )}

            {/* ═══ STEP 2 · READINESS ═══ */}
            {!result && (
              <section className={`step${step === 2 ? " active" : ""}`}>
                <div className="step-head">
                  <span className="eyebrow">02 · Self-assessment</span>
                  <h1>
                    Rate yourself, <em>honestly.</em>
                  </h1>
                  <p className="lead">
                    Score each area 1 to 5. This is your own readiness snapshot, not a test.{" "}
                    <strong>Low scores decide where your roadmap starts</strong>, so they are
                    the useful ones.
                  </p>
                  <span className="tip">
                    <b>TIP</b> Focus a question, then press keys 1 to 5 to score
                  </span>
                </div>

                <div className="legend">
                  <span>
                    <b>1</b>&nbsp;Not started
                  </span>
                  <span className="ln" />
                  {ratedCount > 0 && ratedCount < 6 && (
                    <span className="livechip">
                      <span>
                        So far: {score}/100 · {label}
                      </span>
                    </span>
                  )}
                  <span>{ratedCount} / 6 RATED</span>
                  <span className="ln" />
                  <span>
                    <b>5</b>&nbsp;Investor-ready
                  </span>
                </div>

                <div>
                  {RATING_AREAS.map((area, i) => {
                    const v = s.ratings[i];
                    const shown = hover?.q === i ? hover.v : v ?? 0;
                    return (
                      <div
                        key={area.title}
                        ref={(el) => {
                          qRefs.current[i] = el;
                        }}
                        className={`q${v !== null ? " rated" : ""}${missing.includes(i) ? " missing" : ""}`}
                        tabIndex={0}
                        aria-label={area.title}
                        onKeyDown={onQKeyDown(i)}
                      >
                        <div className="q-head">
                          <span className="q-num">Q{i + 1}</span>
                          <div>
                            <h3>{area.title}</h3>
                            <p>{area.desc}</p>
                          </div>
                        </div>
                        <div className="pills" role="radiogroup" aria-label={`${area.title}: rate 1 to 5`}>
                          {[1, 2, 3, 4, 5].map((p) => (
                            <button
                              key={p}
                              type="button"
                              role="radio"
                              aria-checked={v === p}
                              aria-label={`${p} of 5`}
                              className={`pill${p <= shown ? " on" : ""}${
                                (hover?.q === i ? hover.v === p : v === p) ? " cur" : ""
                              }`}
                              onClick={() => setRating(i, p)}
                              onMouseEnter={() => setHover({ q: i, v: p })}
                              onMouseLeave={() => setHover(null)}
                            >
                              {p}
                            </button>
                          ))}
                          <span className="q-desc">
                            {shown ? RATING_DESCS[shown - 1] : "Tap a score"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {showRateErr && (
                  <p className="ferr" style={{ display: "block", marginTop: 16, fontSize: 12 }}>
                    Please rate all six. The low scores are the ones that help you.
                  </p>
                )}

                <div className="actions">
                  <button type="button" className="btn-line" onClick={() => goStep(1)}>
                    {iconArrL} Back
                  </button>
                  <button type="submit" className="btn">
                    Review my answers {iconArrR}
                  </button>
                </div>
              </section>
            )}

            {/* ═══ STEP 3 · REVIEW ═══ */}
            {!result && (
              <section className={`step${step === 3 ? " active" : ""}`}>
                <div className="step-head">
                  <span className="eyebrow">03 · Review</span>
                  <h1>
                    One last <em>look.</em>
                  </h1>
                  <p className="lead">
                    We read every response. Your answers help the Skillar team understand
                    what founders need most, and your roadmap lands in your account as soon
                    as it is ready.
                  </p>
                </div>

                <div className="memo">
                  <div className="memo-head">
                    <span className="memo-title">YOUR DETAILS</span>
                    <span>
                      <span className="drafttag">DRAFT</span>
                      <button type="button" className="mlink" onClick={() => goStep(1)}>
                        EDIT DETAILS
                      </button>
                      <button type="button" className="mlink" onClick={() => goStep(2)}>
                        EDIT RATINGS
                      </button>
                    </span>
                  </div>
                  <dl>
                    {(
                      [
                        ["Founder", s.name.trim()],
                        ["Startup", s.startup.trim()],
                        ["Email", s.email.trim()],
                        ["WhatsApp", s.phone.trim()],
                        ["Stage", s.stage || "—"],
                        ["Sector", s.sector || "Not stated"],
                        ["Roadmap track", s.need || "—"],
                      ] as const
                    ).map(([dt, dd], idx, arr) => (
                      <div
                        key={dt}
                        className="mrow"
                        style={idx === arr.length - 1 ? { borderBottom: 0 } : undefined}
                      >
                        <dt>{dt}</dt>
                        <dd>{dd}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mscore">
                    <div className="m-num">
                      <span>{score}</span>
                      <small>SELF-ASSESSED SNAPSHOT · {label.toUpperCase()}</small>
                    </div>
                    <div className="mareas">
                      {RATING_AREAS.map((area, i) => {
                        const v = s.ratings[i] ?? 0;
                        return (
                          <div key={area.title} className="marow">
                            <span>{area.title}</span>
                            <span className="madots">
                              {[1, 2, 3, 4, 5].map((k) => (
                                <i key={k} className={`mdot${k <= v ? " on" : ""}`} />
                              ))}
                            </span>
                            <b className="mav">{v}</b>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <p className="mnote">
                    {ratedCount === 6 && strongest === weakest ? (
                      <>
                        Remarkably even across all six areas. Your roadmap anchors to your
                        stated priority: <strong>{s.need}</strong>.
                      </>
                    ) : ratedCount === 6 ? (
                      <>
                        Strongest:{" "}
                        <strong>{RATING_AREAS[s.ratings.indexOf(strongest)].title}</strong> (
                        {strongest}/5). Priority focus:{" "}
                        <strong>{RATING_AREAS[s.ratings.indexOf(weakest)].title}</strong> (
                        {weakest}/5). That is where your roadmap starts.
                      </>
                    ) : null}
                  </p>
                </div>

                {submitErr && <p className="submit-err">{submitErr}</p>}

                <div className="actions">
                  <button type="button" className="btn-line" onClick={() => goStep(2)}>
                    {iconArrL} Back
                  </button>
                  <button type="submit" className="btn" disabled={pending}>
                    {pending ? "Setting up your account..." : <>Get my roadmap {iconArrR}</>}
                  </button>
                </div>
              </section>
            )}

            {/* ═══ SUCCESS ═══ */}
            {result && (
              <section className="step active">
                <div className="done-wrap">
                  <div className="badge" />
                  <span className="eyebrow">You&apos;re in</span>
                  <h1>
                    Got it, <em>{s.name.trim().split(/\s+/)[0] || "founder"}</em>.
                  </h1>
                  <p className="done-copy">
                    {result.alreadyRegistered && result.provisioned ? (
                      <>
                        You&apos;re already set up. This email has a Skillar account with a
                        roadmap in it. Sign in at learning.skillar.ai with your existing
                        credentials, or use &quot;forgot password&quot; if you need a reset.
                      </>
                    ) : result.alreadyRegistered ? (
                      <>
                        You&apos;re already set up. This email has a Skillar account, though
                        a roadmap has not been added yet. Sign in at learning.skillar.ai with
                        your existing credentials; your roadmap will appear as soon as it is
                        ready.
                      </>
                    ) : result.provisioned ? (
                      <>
                        Your Skillar account is ready, and a roadmap is already waiting for
                        you. Login details are on their way to{" "}
                        <strong>{s.email.trim()}</strong>. Check spam if they don&apos;t show
                        within a few minutes.
                      </>
                    ) : (
                      <>
                        Your details are in. We&apos;re setting up your Skillar account, and
                        your roadmap will be added as soon as it is ready. Login details
                        reach <strong>{s.email.trim()}</strong> within 24 hours.
                      </>
                    )}
                  </p>
                  <p className="waline">
                    {iconPhone}
                    <span>WhatsApp follow-up → {s.phone.trim()}</span>
                  </p>

                  <div className="done-card">
                    <div className="done-ring">
                      <svg viewBox="0 0 120 120">
                        <circle className="ring-bg" cx="60" cy="60" r="52" />
                        <circle
                          className="ring-fg"
                          cx="60"
                          cy="60"
                          r="52"
                          style={{ strokeDashoffset: ringOffset(result.score ?? score) }}
                        />
                      </svg>
                      <div className="ring-c">
                        <span className="ring-num">{result.score ?? score}</span>
                        <small
                          style={{
                            font: "500 0.7rem var(--font-mono)",
                            color: "var(--muted)",
                          }}
                        >
                          / 100
                        </small>
                      </div>
                    </div>
                    <div className="refline">
                      <b>Reference</b>
                      <span>{result.reference}</span>
                      <em>
                        Self-assessed snapshot:{" "}
                        <span
                          style={{
                            font: "600 0.95rem var(--font-sans)",
                            color: "var(--accent-deep)",
                          }}
                        >
                          {snapshotLabel(result.score ?? score)}
                        </span>
                      </em>
                    </div>
                  </div>

                  <ol className="nextsteps">
                    <li>
                      <b>01</b>
                      <span>
                        Your account is created on learning.skillar.ai and added to the
                        Eureka founders group.
                      </span>
                    </li>
                    <li>
                      <b>02</b>
                      <span>Login details land in your email. Sign in to see your roadmap as soon as it is ready.</span>
                    </li>
                    <li>
                      <b>03</b>
                      <span>We follow up on WhatsApp to set up your first working session.</span>
                    </li>
                  </ol>

                  <div className="actions">
                    <button type="button" className="btn-line" onClick={reset}>
                      Submit for another founder
                    </button>
                  </div>
                </div>
              </section>
            )}
          </form>
        </main>

        {/* ═══ SNAPSHOT PANEL ═══ */}
        <aside className="panel" aria-live="polite">
          <div className="p-head">
            <span className="pdot" />
            Readiness snapshot
          </div>

          <div className="ringwrap">
            <svg viewBox="0 0 120 120">
              <circle className="ring-bg" cx="60" cy="60" r="52" />
              <circle
                className="ring-fg"
                cx="60"
                cy="60"
                r="52"
                style={{ strokeDashoffset: ringOffset(ratedCount ? score : 0) }}
              />
            </svg>
            <div className="ring-c">
              <span className="ring-num">
                {ratedCount ? score : "—"}
                <small>/100</small>
              </span>
            </div>
          </div>
          <div className="ring-cap">{ratedCount ? label : "Awaiting ratings"}</div>

          <div className="pbar-wrap">
            <div className="pbar-top">
              <span>Profile complete</span>
              <span>{result ? 100 : pct}%</span>
            </div>
            <div className="pbar">
              <i style={{ transform: `scaleX(${(result ? 100 : pct) / 100})` }} />
            </div>
          </div>

          <ul className="checks">
            {(
              [
                ["Name", valid.name],
                ["Startup", valid.startup],
                ["Email", valid.email],
                ["WhatsApp", valid.phone],
                ["Stage", valid.stage],
                ["Roadmap track", valid.need],
              ] as const
            ).map(([lbl, done]) => (
              <li key={lbl} className={`ck${done ? " done" : ""}`}>
                <span className="tick" />
                {lbl}
              </li>
            ))}
            <li className={`ck${s.sector ? " done" : ""}`}>
              <span className="tick" />
              Sector<span className="mini">Optional</span>
            </li>
            <li className={`ck${ratedCount === 6 ? " done" : ""}`}>
              <span className="tick" />
              Self-rating<span className="mini">{ratedCount}/6</span>
            </li>
          </ul>

          <div className="insight">
            <b>Early read</b>
            <span>{insight}</span>
          </div>
          <div className="save">
            {iconSave}
            <span>{saveNote}</span>
          </div>
        </aside>
      </div>

      <footer className="colophon">
        <span>Skillar · skillar.ai</span>
        <span>Responses used for account setup &amp; follow-up only</span>
      </footer>
    </div>
  );
}
