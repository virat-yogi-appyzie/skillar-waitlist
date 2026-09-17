/**
 * home.ts — the homepage's words, in one place.
 *
 * Every claim here has to survive a procurement email. The spine it describes
 * is the one in `src/lib/product-truth.ts`: map roles and skills, assess on a
 * schedule, advanced mastery-tracing flags the concepts below mastery,
 * generate a revision roadmap grounded in the customer's own documents,
 * re-assess, certify, report.
 *
 * House style for this file: sentence case, no eyebrow labels, no em dashes,
 * no decorative all-caps chips, no unicode glyphs standing in for icons.
 * Strings and data only; anything needing an inline element stays in the
 * component.
 *
 * Iteration 08 rewrites this file for plain language. User testing said the
 * page read like a research paper: too technical, too textual, headings you
 * had to already understand the product to parse. The rules applied here:
 * short sentences, concrete nouns, no internal vocabulary in a heading, and
 * every section says its one thing once. Product vocabulary ("mastery
 * threshold", "revision roadmap") survives only where a buyer needs the term;
 * elsewhere it is said in ordinary words. No claim changed, only its wording.
 */

export const hero = {
  /** The accent phrase carries the claim; the component sets it apart. */
  heading: { plain: "Know what your people", accent: "can actually do." },
  lede: "Skillar tests your team on the skills their job actually needs, shows you exactly who is short on what, and gives each person a short plan to close the gap.",
  primaryCta: "Run the free diagnostic",
  secondaryCta: "Book a demo",
  smallPrint: "Free, about three minutes, no signup and no sales call.",
  /**
   * The lockup's fact strip. Three claims a buyer can hold us to, each one
   * already made elsewhere on the site: the diagnostic's own promise, the
   * self-reporting rule, and the expert approval gate.
   */
  facts: [
    { value: "3", unit: "min", label: "to run the free diagnostic" },
    { value: "0", unit: "", label: "self-reported ratings, anywhere" },
    { value: "100", unit: "%", label: "of drafts approved by your experts" },
  ],
} as const;

/**
 * The hero's animated field. Each mark is one person and one skill; the
 * toggle springs them from unmeasured drift into assessed columns. Abstract
 * on purpose: no fabricated numbers, so no disclaimer needed.
 *
 * The chrome strings dress the console as the product surface it stands for.
 * Every figure in the readout row is derived from the marks actually drawn,
 * and the whole surface is labelled sample data; before the field is
 * assessed the readouts show nothing, because nothing has been measured.
 */
export const heroField = {
  chrome: {
    surface: "Capability map",
    sampleTag: "Sample data",
    readouts: {
      marks: "People and skills",
      below: "Below the line",
      families: "Skill families",
      unmeasured: "not yet measured",
    },
  },
  states: { before: "Before Skillar", after: "With Skillar" },
  columns: ["Safety", "Compliance", "Quality", "Operations", "Leadership"],
  thresholdLabel: "Score the role requires",
  /** Shown inside the field while nothing is measured, so the scatter reads
   *  as a statement instead of noise. */
  beforeOverlay: {
    title: "Right now, this is a guess.",
    sub: "Every mark is one person and one skill. Nobody can say which are safe and which are risks.",
  },
  caption:
    "Flip the switch. Scheduled tests place every person against the score their role requires, and the guesses turn into facts.",
} as const;

export const problem = {
  heading: "You cannot fix what you cannot see.",
  lede: "Most companies count training hours. Hours do not tell you whether anyone can do the job.",
  questions: [
    {
      q: "Who is actually weak?",
      a: "A completion report cannot say. A test score can.",
    },
    {
      q: "What does each role need to know?",
      a: "Written down for every job, not guessed at in review season.",
    },
    {
      q: "What should this person study next?",
      a: "The two things they got wrong. Not the forty-hour course again.",
    },
  ],
  footnote:
    "An auditor never asks how many hours someone sat through. They ask whether that person can do the job.",
  aboutLink: "Why we built it this way",
} as const;

/**
 * The product in four verbs. This is the section a visitor who knows nothing
 * about Skillar is meant to understand in one pass, so each step is one word
 * and one sentence. The authoring block underneath answers the obvious next
 * question ("where does the material come from?") and absorbs what used to be
 * a separate AI authoring section.
 */
export const howItWorks = {
  heading: "Four steps. That is the whole product.",
  lede: "It runs on a schedule, for every skill, for every person.",
  steps: [
    {
      title: "Test what the job needs",
      body: "A short test for the skills each role is responsible for, run on a schedule.",
      visual: "test" as const,
    },
    {
      title: "Find the exact gaps",
      body: "Every question is scored, so you see which two ideas are missing, not just weak on safety.",
      visual: "flag" as const,
    },
    {
      title: "Build a short plan",
      body: "Only what they missed, written from your own SOPs, policies and manuals.",
      visual: "plan" as const,
    },
    {
      title: "Prove it worked",
      body: "The same test runs again. The gap between the two scores is your proof.",
      visual: "proof" as const,
    },
  ],
  authoring: {
    heading: "Where the material comes from",
    body: "Upload the documents you already have. Skillar drafts the study plans and quizzes from those, not from the open internet, and one of your experts approves every draft before anyone is enrolled.",
    pipeline: [
      { from: "Lockout and tagout SOP", to: "Machine safety plan, 4 milestones" },
      { from: "AML policy and RBI circulars", to: "Annual AML refresher with quiz" },
      { from: "Batch deviation manual", to: "Deviation reporting study steps" },
    ],
    cta: "How the authoring works",
    href: "/product/ai-authoring",
  },
} as const;

/**
 * The page's one authored motion moment: a scroll-driven account of a single
 * gap closing, from scheduled assessment to reissued certificate.
 *
 * Told about a named person on purpose. A visitor who bounced off the
 * abstract sections above can follow one operator through one bad score and
 * understand the product from this section alone.
 */
export const loopStory = {
  heading: "Watch one gap close.",
  lede: "Rohit runs a machine on the factory floor. Here is what happens when his safety test comes back.",
  steps: [
    {
      tab: "The score",
      title: "His test comes back at 64",
      body: "Rohit's job requires machine safety, so Skillar tests him on it every quarter. He needs 85 to be counted as safe. He got 64.",
      visual: "score" as const,
    },
    {
      tab: "The diagnosis",
      title: "Two ideas, not the whole subject",
      body: "Skillar reads every question he answered and finds the problem is exactly two things: the order of the lockout steps, and checking for stored energy.",
      visual: "concepts" as const,
    },
    {
      tab: "The plan",
      title: "He gets a four-step plan",
      body: "Written from the plant's own lockout SOP and equipment manuals. Nothing about the six things he already knows.",
      visual: "roadmap" as const,
    },
    {
      tab: "The retest",
      title: "He studies, then retakes it",
      body: "The retest covers only the two things he missed. He gets 91. The gap closed on evidence, not on attendance.",
      visual: "reassess" as const,
    },
    {
      tab: "The certificate",
      title: "His certificate renews",
      body: "New expiry date, with the whole trail behind it. His manager's view updates, and so does the company's.",
      visual: "certify" as const,
    },
  ],
  closing:
    "That runs for every tracked skill and every person, on a schedule. Your picture is never older than the last round of tests.",
  cta: { label: "See the full product", href: "/product" },
} as const;

export const skillIntelligence = {
  heading: "See the whole company. Or one person.",
  lede: "Start from a department that looks weak. Two clicks later you are looking at the people in it and what each of them needs to study.",
  highlights: [
    {
      label: "It is measured, not self-reported.",
      body: "Every gap comes from a scored test, never from someone rating themselves out of five.",
    },
    {
      label: "It ends in something to do.",
      body: "A weak spot on the org chart resolves to named people and their study plans.",
    },
  ],
  cta: "Explore Skill Intelligence",
} as const;

export const todayVsSkillar = {
  heading: "What changes.",
  lede: "The work your L&D team already does, done a different way.",
  columns: {
    stage: "The job",
    today: "How it works today",
    skillar: "With Skillar",
  },
  rows: [
    {
      stage: "Deciding what to teach",
      today:
        "A yearly survey where people rate themselves, plus whatever managers remember in review season.",
      skillar:
        "Scheduled tests score what people can actually do against what their role requires.",
    },
    {
      stage: "Making your own material",
      today:
        "A designer interviews an expert and ships a course in six to twelve weeks. The expert is the bottleneck.",
      skillar:
        "Your documents become the material. The expert reviews a draft instead of writing one.",
    },
    {
      stage: "Proving it worked",
      today:
        "Completion rates and a satisfaction score. Neither says whether anyone got better.",
      skillar: "The retest score, sitting next to the first one.",
    },
    {
      stage: "What leadership sees",
      today:
        "Hours consumed and seats filled. A spend report dressed up as a capability report.",
      skillar:
        "Who is ready, which certificates expire next, and what is being done about each gap.",
    },
  ],
} as const;

/**
 * Who the evidence serves. Rendered as a ledger, not cards: each row is one
 * chair at the table and the one sentence that chair cares about.
 */
export const audiences = {
  heading: "Who it is for.",
  lede: "The same evidence answers a different question depending on where you sit.",
  rows: [
    {
      label: "Learning and development",
      body: "Stop reporting hours. Report whether people actually got better.",
      href: "/solutions/learning-development",
      linkLabel: "How L&D teams use Skillar",
    },
    {
      label: "Human resources",
      body: "Know what your workforce can do, checked by test rather than assumed from job titles.",
      href: "/solutions/hr",
      linkLabel: "How HR teams use Skillar",
    },
    {
      label: "Managers",
      body: "See who on your team needs help, and exactly what they should study.",
      href: "/solutions/managers",
      linkLabel: "How managers use Skillar",
    },
    {
      label: "Enterprise and compliance",
      body: "Turn training records into evidence that survives an audit.",
      href: "/solutions/enterprise",
      linkLabel: "How enterprises use Skillar",
    },
  ],
} as const;

/** The interactive taxonomy sampler near the close of the page. */
export const diagnostic = {
  heading: "What would Skillar test in your team?",
  lede: "Pick a sector and a role. These are the real skills we would benchmark for it. No signup.",
} as const;

/**
 * The objections a buyer raises before committing, answered in the order
 * they come up. Every answer is representable in product-truth.ts: the
 * security answer states the pre-launch posture rather than certifications
 * we do not hold.
 */
export const faq = {
  heading: "What buyers ask us.",
  lede: "The questions that come up in every first conversation, answered plainly.",
  items: [
    {
      q: "How does Skillar measure skills?",
      a: "With scheduled, scored tests against the skills each role is responsible for. Every score comes from real answers to real questions, never from someone rating themselves out of five.",
    },
    {
      q: "How is this different from our LMS?",
      a: "An LMS tracks who completed which course. Skillar measures whether people can actually do the work, then generates revision only for the concepts a test flagged. The two are not rivals; many teams would run both.",
    },
    {
      q: "Where does the learning material come from?",
      a: "From you. Upload the SOPs, policies and manuals you already maintain, and Skillar drafts study plans and quizzes from those documents, not from the open internet. One of your experts approves every draft before anyone is enrolled.",
    },
    {
      q: "How long does a rollout take?",
      a: "You can start with one or two departments. Roles and skills are mapped first, then assessments run on a schedule, and each flagged gap gets a revision plan. Our team configures it with you, and you see which gaps closed in the score reports.",
    },
    {
      q: "Is our data secure?",
      a: "Each organisation's data is strictly isolated, access is role-based across employee, manager and admin views, and your data never trains public models. We are pre-launch: SOC 2 Type II is on our roadmap rather than complete, and we walk every design partner through our current controls.",
    },
    {
      q: "What does it cost?",
      a: "Pricing is scoped to your workforce. The pricing page shows what each tier includes, and we put every number in writing before you commit.",
      link: { label: "See pricing", href: "/pricing" },
    },
  ],
} as const;

export const finalCta = {
  heading: "See what your team needs to learn next.",
  lede: "Pick your sector and role. We will email you the gap report, free.",
  primaryCta: "Run the free diagnostic",
  secondaryCta: "Book a walkthrough",
} as const;

