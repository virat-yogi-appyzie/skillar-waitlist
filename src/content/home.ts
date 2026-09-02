/**
 * home.ts — the homepage's words, in one place.
 *
 * Every claim here has to survive a procurement email. The spine it describes
 * is the one in `src/lib/product-truth.ts`: map roles and skills, assess on a
 * schedule, Bayesian Knowledge Tracing flags the concepts below mastery,
 * generate a revision roadmap grounded in the customer's own documents,
 * re-assess, certify, report.
 *
 * House style for this file: sentence case, no eyebrow labels, no em dashes,
 * no decorative all-caps chips, no unicode glyphs standing in for icons.
 * Strings and data only; anything needing an inline element stays in the
 * component.
 */

export const hero = {
  headingLines: ["Know what your people", "need to learn next."],
  lede: "Skillar maps the skills each role is accountable for, assesses them on a schedule, and generates a revision roadmap for whatever the results flag.",
  primaryCta: "Run the free diagnostic",
  secondaryCta: "Book a demo",
  smallPrint:
    "The diagnostic is free and takes about three minutes. No account, no sales call. We are pre-launch, currently onboarding design partners.",
} as const;

/**
 * The hero's animated field. Each mark is one person and one skill; the
 * toggle springs them from unmeasured drift into assessed columns. Abstract
 * on purpose: no fabricated numbers, so no disclaimer needed.
 */
export const heroField = {
  states: { before: "Before Skillar", after: "With Skillar" },
  columns: ["Safety", "Compliance", "Quality", "Operations", "Leadership"],
  thresholdLabel: "Mastery threshold",
  /** Shown inside the field while nothing is measured, so the scatter reads
   *  as a statement instead of noise. */
  beforeOverlay: {
    title: "Capability, unmeasured.",
    sub: "Each mark is one person and one skill. Right now they are all guesses: nobody can say which are solid and which are risks.",
  },
  caption:
    "Flip the state: scheduled assessments place every person and skill against a mastery threshold, and the gaps stop being guesses.",
} as const;

export const problem = {
  heading: "More learning isn't the answer.",
  lede: "Organizations spend millions on course catalogs, certifications, and seat hours. Yet leaders still cannot answer three questions:",
  questions: [
    {
      q: "Where are our teams actually weak?",
      a: "A completion report cannot say. A scored assessment can.",
    },
    {
      q: "Which skills must each role hold next quarter?",
      a: "Written down as role requirements, not guessed at in review season.",
    },
    {
      q: "What exactly should each person revise?",
      a: "The three concepts they missed, not the forty-hour course they already sat through.",
    },
    ],
  footnote:
    "Seat time is a vanity metric. An auditor asks whether the person can do the job.",
  aboutLink: "Read why we built it this way",
} as const;

export const newModel = {
  heading: "Understand first. Then teach.",
  lede: "Skillar doesn't start with a catalog. It starts with an objective picture of your people: the skills their roles demand, the scores their assessments produced, and the gaps between the two.",
  inputsTitle: "What the picture is built from",
  inputs: [
    {
      name: "Role and skill frameworks",
      detail: "The competencies each job profile is accountable for, mapped to your own levels.",
    },
    {
      name: "Scheduled assessments",
      detail: "Recurring quizzes generated against the skills a role has to hold.",
    },
    {
      name: "Mastery thresholds",
      detail: "The score a skill has to clear before it counts as held.",
    },
    {
      name: "Results and roadmap progress",
      detail: "Question-level evidence, step completion, and re-assessment scores.",
    },
    {
      name: "Your own source material",
      detail: "The SOPs, policies, manuals, and expert notes your team uploads.",
    },
  ],
  closing:
    "Capability comes from assessment results, never self-reported ratings. Revision is generated only for the concepts an assessment flagged.",
} as const;

/**
 * The page's one authored motion moment: a scroll-driven account of a single
 * gap closing, from scheduled assessment to reissued certificate. Steps are
 * genuinely ordinal, so numbering is earned here and nowhere else.
 */
export const loopStory = {
  heading: "How one gap closes.",
  lede: "Follow a single skill for a single person: a line operator whose annual machine safety assessment just came back.",
  personLabel: "Sample scenario",
  steps: [
    {
      title: "The scheduled assessment runs",
      body: "Rohit's role carries machine safety. Every quarter, Skillar generates and scores an assessment against that skill. This round: 64 percent, against a mastery threshold of 85.",
      visual: "score" as const,
    },
    {
      title: "BKT reads every answer",
      body: "Bayesian Knowledge Tracing works through the question-level evidence and finds the failure isn't general. Two concepts sit below mastery: lockout procedure ordering, and stored-energy checks.",
      visual: "concepts" as const,
    },
    {
      title: "A revision roadmap is generated",
      body: "Four steps, drawn from the plant's own lockout SOP and equipment manuals. Nothing about the six concepts Rohit already holds.",
      visual: "roadmap" as const,
    },
    {
      title: "He revises, then re-assesses",
      body: "The follow-up assessment re-tests the two flagged concepts. 91 percent. The gap is closed on evidence, not on attendance.",
      visual: "reassess" as const,
    },
    {
      title: "The certificate is reissued",
      body: "Machine safety certification renews with a new expiry date and an audit trail behind it. His manager's heatmap updates. So does the org's readiness score.",
      visual: "certify" as const,
    },
  ],
  closing:
    "That loop runs for every tracked skill of every person, on a schedule. The capability map is never older than the last assessment round.",
  cta: { label: "Explore the full product loop", href: "/product" },
} as const;

export const skillIntelligence = {
  heading: "From the whole company to one person's weakest concept.",
  lede: "Skillar holds capability at every level of the organization, so a question about a department and a question about a person are the same query at different depths.",
  highlights: [
    {
      label: "Objective verification.",
      body: "Gaps come from scheduled assessments scored question by question, not from self-ratings.",
    },
    {
      label: "Drill-down that terminates in action.",
      body: "An org-level weakness resolves to named people and their revision roadmaps, in seconds.",
    },
  ],
  cta: "Explore Skill Intelligence",
} as const;

export const todayVsSkillar = {
  heading: "What your L&D team does today, and what changes.",
  lede: "No vendor deserves to be believed on a headline. This is the specific work that moves, stage by stage.",
  columns: {
    stage: "Stage",
    today: "Today, without Skillar",
    skillar: "With Skillar",
  },
  rows: [
    {
      stage: "Deciding what to teach",
      today:
        "A skills survey once a year, plus whatever managers flag in review season. Self-reported, and months stale by the time it is collated.",
      skillar:
        "Scheduled assessments score demonstrated ability against what the role requires. The map is never older than the last assessment round.",
    },
    {
      stage: "Choosing content",
      today:
        "Licence a catalogue of 5,000 courses and hope the relevant two percent get found. Completion is the only signal you can report.",
      skillar:
        "Revision is generated for a concept an assessment flagged, or it is not generated at all. Nothing is assigned that a result did not justify.",
    },
    {
      stage: "Building something bespoke",
      today:
        "An instructional designer interviews an expert, writes a storyboard, and ships in six to twelve weeks. The expert is the bottleneck.",
      skillar:
        "Your SOPs, policies and manuals are compiled into structured roadmaps and quizzes. The expert reviews rather than writes.",
    },
    {
      stage: "Proving it worked",
      today:
        "Completion rates and a satisfaction score. Neither correlates with whether anyone can now do the thing.",
      skillar:
        "The same assessment is re-run after the roadmap. The difference between the two scores is the result, and it rolls up to team and department.",
    },
    {
      stage: "What leadership sees",
      today: "Hours consumed and seats filled. A spend report dressed as a capability report.",
      skillar:
        "Where capability sits against role requirements, which certifications expire next, and what is being done about each.",
    },
  ],
} as const;

export const aiAuthoring = {
  heading: "Your experts have the knowledge. AI turns it into learning.",
  lede: "AI doesn't replace your learning experts. It reads the SOPs, policies, and equipment manuals you upload and drafts the roadmap from those documents rather than the open internet: milestones, step content, and assessment quizzes. Your expert reviews and approves.",
  pipeline: [
    { from: "Lockout and tagout SOP, rev 12", to: "Machine safety roadmap, 4 milestones" },
    { from: "AML policy and RBI circulars", to: "Annual AML refresher with quiz" },
    { from: "Batch record deviation manual", to: "Deviation reporting revision steps" },
  ],
  reviewNote: "Every draft is held for a named reviewer's approval before anyone is enrolled.",
  cta: "Explore AI Authoring",
} as const;

export const finalCta = {
  heading: "Now see what your organization needs to learn next.",
  lede: "The free diagnostic maps your sector's roles to the competencies we benchmark and emails you the gap report.",
  primaryCta: "Run the free diagnostic",
  secondaryCta: "Book a demo",
} as const;
