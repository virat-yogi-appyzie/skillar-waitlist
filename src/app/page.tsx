import Header from "@/components/Header";
import Footer from "@/components/Footer";

import HeroSection from "@/components/home/HeroSection";
import QuestionsChapter from "@/components/home/QuestionsChapter";
import NewModelSection from "@/components/home/NewModelSection";
import InlineDiagnostic from "@/components/home/InlineDiagnostic";
import LoopStory from "@/components/home/LoopStory";
import SkillIntelligenceSection from "@/components/home/SkillIntelligenceSection";
import TodayVsSkillar from "@/components/home/TodayVsSkillar";
import Thesis from "@/components/home/Thesis";
import AIAuthoringSection from "@/components/home/AIAuthoringSection";
import FinalCTA from "@/components/home/FinalCTA";

/**
 * Homepage, iteration 06: three pinned chapters.
 *
 * The user's verdict on iteration 05 was that LoopStory was "by far the
 * best" section, so its scroll-driven idiom now carries three chapters:
 * the hero field (scroll performs the assessment), QuestionsChapter (the
 * three unanswerable questions with a pinned scene panel), and LoopStory
 * itself. Everything else stays still so the motion keeps meaning. Brand
 * stays light/blue; the dark navy panels are the accent, not the ground.
 *
 * Previous iteration notes:
 * Iteration 05: the anti-slop pass.
 *
 * What changed from iteration 04 and why:
 * - One motion budget. LoopStory is the page's single authored, scroll-driven
 *   moment (one gap closing, five beats). Everything else is static: no
 *   per-section fade-up reveals, no magnetic buttons, no pulsing dots.
 * - One piece of product UI. The interactive CapabilityMap remains; the other
 *   synthetic dashboards (hero landscape, problem tabs, engine console,
 *   authoring pipeline, CTA core) were replaced with typographic ledgers or
 *   removed with their sections.
 * - No eyebrow labels, no decorative section numbering, no two-tone or
 *   italicised headline devices, no unicode glyphs standing in for icons,
 *   no em dashes in copy.
 * - Section shapes now genuinely differ: editorial hero, question-and-answer
 *   ledger, definition list, live form, pinned scroll story, product UI,
 *   dense table, letter, from/to ledger, quiet close.
 *
 * Cut from the flow (files kept): IntelligenceEngine, AdaptiveLearningSection,
 * GapToAction, EditorialPause. Their stories are told by LoopStory.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection />
        <QuestionsChapter />
        <NewModelSection />
        <InlineDiagnostic />
        <LoopStory />
        <SkillIntelligenceSection />
        <TodayVsSkillar />
        <Thesis />
        <AIAuthoringSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
