import Header from "@/components/Header";
import Footer from "@/components/Footer";

import HeroSection from "@/components/home/HeroSection";
import ProblemSection from "@/components/home/ProblemSection";
import HowItWorks from "@/components/home/HowItWorks";
import LoopStory from "@/components/home/LoopStory";
import SkillIntelligenceSection from "@/components/home/SkillIntelligenceSection";
import TodayVsSkillar from "@/components/home/TodayVsSkillar";
import AudienceSection from "@/components/home/AudienceSection";
import InlineDiagnostic from "@/components/home/InlineDiagnostic";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";

/**
 * Homepage, iteration 09: the conversion pass.
 *
 * A competitor AI's single-page rebuild of skillar.ai beat us on product
 * presence and conversion furniture while losing to us on truth and real
 * plumbing. This iteration ports its wins without its fabrications:
 * - HeroField gained product chrome: a surface title, a "Sample data" tag,
 *   and a readout row whose every figure is derived from the marks actually
 *   drawn. The field's canvas animation is untouched, by explicit user
 *   preference; only the console around it changed.
 * - LoopStory keeps its scroll scrub and orbit transition untouched, also by
 *   explicit user preference, and gains only a beat rail above the stage:
 *   the five beats named, the active one filling with scroll progress, each
 *   clickable to jump the scroll there.
 * - FAQSection answers the six pre-pilot objections between the diagnostic
 *   and the final CTA; copy is truth-verified against product-truth.ts.
 * - Header gained a reading-progress hairline; the primary button gained a
 *   one-pass light sweep on hover.
 *
 * Iteration 08 (the plain-language pass) below, still current:
 *
 * Driven by user testing of iteration 07: "reads like a research paper, too
 * technical, too textual, headings you can't parse without knowing the
 * product". The hero and its scroll-scrubbed field stay by explicit user
 * preference. What changed and why:
 * - Every heading and body in src/content/home.ts was rewritten in plain
 *   words at roughly half the length. No claim changed, only its wording.
 * - QuestionsChapter (pinned dark data panels) collapsed into ProblemSection,
 *   three big questions and one line each; the hero field above already
 *   shows unmeasured-versus-measured, so nothing visual repeats.
 * - NewModelSection's five-input inventory became HowItWorks: the product in
 *   four verbs (Test, Find, Fix, Prove), with the old AIAuthoringSection
 *   absorbed as the "where the material comes from" ledger beneath it.
 * - Thesis was cut from the flow; its argument lives on /about, which
 *   ProblemSection links to.
 * - TodayVsSkillar dropped from five rows to four with one-line cells.
 * - Photography: art-directed scenes (factory operator, expert reviewer)
 *   composited with product chips, per the LearnRush-style reference, are
 *   wired in where the imagery pass lands them.
 *
 * Motion budget holds: the hero field and LoopStory carry the scroll-driven
 * moments; everything else stays still.
 *
 * Cut from the flow (files kept): QuestionsChapter, Thesis, plus iteration
 * 07's cuts (IntelligenceEngine, AdaptiveLearningSection, GapToAction,
 * EditorialPause). NewModelSection and AIAuthoringSection were removed with
 * their content exports.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection />
        <ProblemSection />
        <HowItWorks />
        <LoopStory />
        <SkillIntelligenceSection />
        <TodayVsSkillar />
        <AudienceSection />
        <InlineDiagnostic />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
