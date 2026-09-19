// Toolkit page. Wording locked in the Toolkit Page Working Document, version 3.
// Page address /toolkit replaces /projects. Page name: The Routine Ready Toolkit.

export const toolkitSEO = {
  title: "Toolkit",
  description:
    "The Routine Ready Toolkit: everyday tools to help you pause before you push, in five minutes or less. PACE Energy Check, Mindless Flow, HAWFA Check-In, Decision for Now, PACE Week Planner and more.",
};

export type ToolStatus = "live" | "building";

export type Tool = {
  slug: string;
  title: string;
  desc: string;
  label: string | null;
  image: string;
  status: ToolStatus;
  /** Which built component renders on the tool page. */
  component: "energy" | "mindless" | "hawfa" | "decision" | "week" | "words" | "rest";
  /** The tool the result points to next, by slug. */
  next: string;
  pageLabel?: string;
  pageIntro?: string;
};

export const tools: Tool[] = [
  {
    slug: "pace-energy-check",
    title: "PACE Energy Check",
    desc: "Four quick questions about your body, energy and mind, and the pace your day can hold.",
    label: "Start here.",
    image: "/assets/avenzor/images/tool-pace-energy.webp",
    status: "live",
    component: "energy",
    next: "pace-week-planner",
  },
  {
    slug: "mindless-flow",
    title: "Mindless Flow",
    desc: "Set five minutes, put pen to paper and do not stop. Freestyle or use a prompt, then pause and notice what came up.",
    label: null,
    image: "/assets/avenzor/images/tool-mindless-flow.webp",
    status: "building",
    component: "mindless",
    next: "hawfa-check-in",
  },
  {
    slug: "hawfa-check-in",
    title: "HAWFA Check-In",
    desc: "The greeting we answer without thinking, asked again until the true answer comes out.",
    label: null,
    image: "/assets/avenzor/images/tool-hawfa.webp",
    status: "building",
    component: "hawfa",
    next: "pace-energy-check",
  },
  {
    slug: "decision-for-now",
    title: "Decision for Now",
    desc: "Name your why, weigh what each option costs your time, energy, money and peace, and choose a decision that fits this season.",
    label: "Decisions That Work.",
    image: "/assets/avenzor/images/tool-decision.webp",
    status: "building",
    component: "decision",
    next: "pace-week-planner",
  },
  {
    slug: "pace-week-planner",
    title: "PACE Week Planner",
    desc: "Choose your capacity for the week first, then up to three focus tasks that can move between days.",
    label: null,
    image: "/assets/avenzor/images/tool-week-planner.webp",
    status: "live",
    component: "week",
    next: "pace-energy-check",
  },
  {
    slug: "words-for-asking-for-help",
    title: "Words for Asking for Help",
    desc: "Clear words for asking for help and explaining needs other people cannot see, without over-explaining.",
    label: null,
    image: "/assets/avenzor/images/advocacy-voice.webp",
    status: "live",
    component: "words",
    next: "rest-without-guilt-prompts",
    pageLabel: "Self-advocacy · Toolkit",
    pageIntro:
      "Clear words for asking for help, setting limits and explaining needs other people cannot see, without having to defend every request.",
  },
  {
    slug: "rest-without-guilt-prompts",
    title: "Rest Without Guilt Prompts",
    desc: "Journal prompts for resting without treating it as failure.",
    label: null,
    image: "/assets/avenzor/images/advocacy-pain.webp",
    status: "live",
    component: "rest",
    next: "hawfa-check-in",
  },
];

export const getTool = (slug: string) => tools.find((tool) => tool.slug === slug);

export const toolkitHeroContent = {
  eyebrow: "Routine Ready Toolkit",
  headline: "Tools to help you pause before you push",
  body: "Most of us are not short of effort. We are short of a moment to stop, see what is true and choose. These tools give you that moment, in five minutes or less, right here on the page.",
  cta: { label: "Start with the PACE Energy Check", href: "/toolkit/pace-energy-check" },
  image: "/assets/avenzor/images/toolkit-hero.webp",
};

export const whyRoutineReadyContent = {
  eyebrow: "Why Routine Ready",
  headline: "Slow first. Then precise.",
  body: "Routine Ready comes from NO GraGra: no noise, no panic, no pressure, just rhythm. When everything feels urgent, the instinct is to push harder. These tools do the opposite. They help you pause, empty your head, check what you can carry, and make a decision that fits the life you actually have.",
};

export const dayWithToolkitContent = {
  eyebrow: "A day with the toolkit",
  headline: "You do not need every tool. You need the next one.",
  intro: "Here is how the tools fit into a day. Use one, use a few, or come back when you need them.",
  moments: [
    {
      when: "Morning",
      title: "Clear and check in",
      text: "Mindless Flow empties your head. HAWFA Check-In asks how you are before the day asks anything of you. PACE Energy Check sets a pace your body can hold.",
    },
    {
      when: "During the day",
      title: "When it gets heavy",
      text: "Mindless Flow again when your mind gets crowded. Decision for Now when you are stuck. Words for Asking for Help when you need someone else.",
    },
    {
      when: "Evening",
      title: "Return",
      text: "HAWFA Check-In. HAWFA? (How are you?)",
    },
    {
      when: "Each week",
      title: "Plan with your capacity",
      text: "PACE Week Planner.",
    },
  ],
  closingLine:
    "HAWFA is for you. PACE is for your work. On a hard day, skip the sequence and pick the one step that brings you back.",
};

export const interactiveToolsContent = {
  eyebrow: "Interactive tools",
  headline: "Use them right here, in five minutes or less",
};

export const whichToolContent = {
  eyebrow: "Not sure where to start?",
  headline: "Start with what you are feeling",
  routes: [
    { feeling: "My head is full.", slug: "mindless-flow" },
    { feeling: "I say I am fine, but I am not sure I am.", slug: "hawfa-check-in" },
    { feeling: "I do not know how much I can do today.", slug: "pace-energy-check" },
    { feeling: "I cannot decide.", slug: "decision-for-now" },
    { feeling: "My week feels too big.", slug: "pace-week-planner" },
    { feeling: "I need help but do not know how to ask.", slug: "words-for-asking-for-help" },
    { feeling: "I feel guilty for resting.", slug: "rest-without-guilt-prompts" },
  ],
};

export const goDeeperContent = {
  eyebrow: "Go deeper",
  headline: "When you want to see the bigger picture",
  body: "Some tools are not for every day. They help you see where you are across your life and work, and several are part of how I work with people.",
  groups: [
    { name: "Occasional check-ins", items: ["WAIT Audit", "SyncCheck", "The Autonomy Grid", "LifeSync Grid"] },
    {
      name: "The Pace system",
      items: [
        "PaceSetter (daily and weekly pages and journal)",
        "Weekly Pace Reflector",
        "Monthly MAP Out",
        "Continuity Review",
        "90-Day Commitment Map",
      ],
    },
    { name: "Series", items: ["REset Lab", "The MAP Series", "The Leverage Series"] },
  ],
  cta: { label: "See how I work with people", href: "/work" },
};

export const toolkitQuietFocusContent = {
  eyebrow: "Quiet Focus",
  headline: "New tools arrive in the letter first",
  body: "Join Quiet Focus to hear when a new tool is ready, along with new reflections and dates for The Curious Creative.",
  cta: { label: "Join Quiet Focus", href: "/quiet-focus" },
  line: "Not a classroom. Not a stage.",
};
