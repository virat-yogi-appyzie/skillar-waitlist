"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import {
  getIndustries,
  getRolesByIndustry,
  getSkillsByIndustryAndRole,
  type IndustryOption,
  type RoleOption,
  type SkillOption,
} from "@/lib/dropdown-actions";

/**
 * The only section on the homepage the visitor operates rather than looks at.
 *
 * It reads the real taxonomy out of the database — the same one the full
 * diagnostic uses — so picking an industry and a role shows the competencies
 * Skillar would actually benchmark for that role.
 *
 * Deliberately does NOT invent a score. Two clicks cannot produce a real gap
 * measurement, and fabricating one here would be the same dishonesty as the
 * "LIVE" dashboards. The value on offer is: the taxonomy is real, and specific
 * to your world.
 */
export default function InlineDiagnostic() {
  const [industries, setIndustries] = useState<IndustryOption[]>([]);
  const [roles, setRoles] = useState<RoleOption[]>([]);
  const [skills, setSkills] = useState<SkillOption[]>([]);

  const [industry, setIndustry] = useState<IndustryOption | null>(null);
  const [role, setRole] = useState<RoleOption | null>(null);

  const [loadingRoles, setLoadingRoles] = useState(false);
  const [loadingSkills, setLoadingSkills] = useState(false);

  useEffect(() => {
    getIndustries()
      .then((list) => setIndustries(list.filter((i) => !i.isCustom).slice(0, 6)))
      .catch(() => setIndustries([]));
  }, []);

  const chooseIndustry = async (ind: IndustryOption) => {
    setIndustry(ind);
    setRole(null);
    setSkills([]);
    setLoadingRoles(true);
    try {
      const r = await getRolesByIndustry(ind.id);
      setRoles(r.filter((x) => x.id > 0 && !x.isCustom).slice(0, 6));
    } catch {
      setRoles([]);
    } finally {
      setLoadingRoles(false);
    }
  };

  const chooseRole = async (r: RoleOption) => {
    setRole(r);
    setLoadingSkills(true);
    try {
      const s = await getSkillsByIndustryAndRole(industry!.id, r.id);
      setSkills(s.filter((x) => !x.isCustom).slice(0, 8));
    } catch {
      setSkills([]);
    } finally {
      setLoadingSkills(false);
    }
  };

  const chip =
    "px-3.5 py-2 rounded-full border text-[13px] font-medium transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";
  const chipIdle = "bg-white border-border text-navy hover:border-accent/50 hover:bg-accent/[0.03]";
  const chipOn = "bg-accent border-accent text-white shadow-xs";

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-surface border-y border-border/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="font-serif text-[clamp(1.9rem,4vw,3rem)] font-normal text-navy leading-[1.08] tracking-[-0.025em] mb-4 text-balance">
            What would Skillar measure in your team?
          </h2>
          <p className="text-navy-500 text-base sm:text-lg leading-relaxed">
            Pick a sector and a role. These are the real competencies we benchmark, pulled
            from the same taxonomy the full diagnostic runs on. No signup.
          </p>
        </div>

        <div className="max-w-3xl mx-auto rounded-3xl border border-border bg-surface-elevated shadow-card p-6 sm:p-8">
          {/* Step 1 — note the persistent CTA below the fold of this card: the
              conversion point must exist for a visitor who never interacts. */}
          <fieldset className="mb-6">
            <legend className="text-sm font-semibold text-navy-500 mb-3">Sector</legend>
            <div className="flex flex-wrap gap-2">
              {industries.length === 0 ? (
                <span className="text-xs text-navy-500">Loading sectors…</span>
              ) : (
                industries.map((ind) => (
                  <button
                    key={ind.id}
                    type="button"
                    onClick={() => chooseIndustry(ind)}
                    aria-pressed={industry?.id === ind.id}
                    className={`${chip} ${industry?.id === ind.id ? chipOn : chipIdle}`}
                  >
                    {ind.name}
                  </button>
                ))
              )}
            </div>
          </fieldset>

          {/* Step 2 */}
          {industry && (
            <fieldset className="mb-6 pt-6 border-t border-border/70">
              <legend className="text-sm font-semibold text-navy-500 mb-3">Role</legend>
              {loadingRoles ? (
                <span className="text-xs text-navy-500 inline-flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Loading roles for {industry.name}…
                </span>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => chooseRole(r)}
                      aria-pressed={role?.id === r.id}
                      className={`${chip} ${role?.id === r.id ? chipOn : chipIdle}`}
                    >
                      {r.name}
                    </button>
                  ))}
                </div>
              )}
            </fieldset>
          )}

          {/* Result */}
          {role && (
            <div className="pt-6 border-t border-border/70">
              <div className="flex items-baseline justify-between gap-3 mb-4 flex-wrap">
                <span className="text-sm font-semibold text-navy-500">
                  Competencies we&apos;d benchmark
                </span>
                <span className="text-sm font-medium text-accent tabular">
                  {skills.length} for {role.name}
                </span>
              </div>

              {loadingSkills ? (
                <span className="text-xs text-navy-500 inline-flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Mapping competencies…
                </span>
              ) : skills.length === 0 ? (
                <p className="text-sm text-navy-500">
                  We don&apos;t have a published taxonomy for this role yet. The full
                  diagnostic lets you define your own.
                </p>
              ) : (
                <>
                  <ul className="grid sm:grid-cols-2 gap-2 mb-6">
                    {skills.map((s) => (
                      <li
                        key={s.id}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-surface border border-border/70"
                      >
                        <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span className="text-[13px] text-navy leading-snug">{s.name}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between p-4 rounded-2xl bg-accent/[0.04] border border-accent/20">
                    <p className="text-[13px] text-navy-600 leading-snug">
                      The full diagnostic scores each of these against your role benchmark and
                      returns a written report.
                    </p>
                    <Link
                      href={`/skills-gap-diagnostic?industry=${industry!.id}&role=${role.id}`}
                      className="btn-primary shrink-0 justify-center text-sm"
                    >
                      Continue with {role.name}
                      <ArrowRight className="w-4 h-4" strokeWidth={2} />
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Always present. A visitor who scrolls past without touching the chips
            still needs somewhere to go — this is the page's mid-point CTA. */}
        {!role && (
          <p className="max-w-3xl mx-auto text-center mt-6 text-sm text-navy-500">
            Or{" "}
            <Link
              href="/skills-gap-diagnostic"
              className="text-accent font-medium hover:text-accent-hover underline underline-offset-4 decoration-accent/30"
            >
              run the full seven-step diagnostic
            </Link>
            . About three minutes, no account required.
          </p>
        )}
      </div>
    </section>
  );
}
