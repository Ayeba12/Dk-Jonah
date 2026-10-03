// The search phrases each page should be found for. One place to review and change them.
// They feed the page metadata, the structured data (WebPage and Article "keywords", the Person's "knowsAbout")
// and /llms.txt. Page copy itself stays as DK locked it; these are the terms people type, not the words on the page.
// House rules apply here too: British spelling, NO GraGra, Quiet Focus as two words, no "free", no hype.

// What the whole site is about. Added to every page after its own phrases.
export const siteKeywords = [
  "DK Jonah",
  "chronic illness coach",
  "neurodivergent coach",
  "lived experience speaker",
  "invisible illness",
  "hidden captivity",
  "NO GraGra",
  "The Autonomy Code",
  "Knowledge Architect",
  "faith without performance",
  "Routine Ready Toolkit",
  "Quiet Focus",
];

// The subjects DK speaks and writes about, for the Person record search engines and AI assistants build.
export const expertiseTopics = [
  "Chronic illness and invisible illness",
  "Neurodiversity and late diagnosis",
  "Lived experience leadership",
  "Knowledge architecture",
  "Goal setting and decision making",
  "Capacity-based planning and pacing",
  "Faith without performance",
  "Hidden captivity",
  "NO GraGra",
  "Speaking, teaching and facilitation",
];

export const pageKeywords: Record<string, string[]> = {
  "/": [
    "chronic illness writer",
    "neurodivergent writing",
    "faith reflections",
    "language for invisible illness",
    "tools for low energy days",
    "goals you can keep",
    "Nigerian writer and speaker UK",
  ],
  "/about": [
    "about DK Jonah",
    "who is DK Jonah",
    "Nigerian writer speaker and coach",
    "restorative coach",
    "chronic illness advocate",
    "neurodiversity advocate",
    "lived experience leadership",
    "Decisions That Work",
  ],
  "/work": [
    "work with DK Jonah",
    "coaching for people with chronic illness",
    "coaching for neurodivergent adults",
    "one to one coaching UK",
    "decision making coach",
    "The Annual Reset",
    "Knowledge Architecture consultancy",
    "Communication Clarity Audit",
    "turn what you know into a framework",
  ],
  "/speaking": [
    "chronic illness speaker",
    "neurodiversity speaker",
    "lived experience speaker UK",
    "Christian speaker UK",
    "church speaker on invisible illness",
    "lived experience leadership training",
    "workshop facilitator",
    "panel speaker",
    "podcast guest",
    "invite DK Jonah to speak",
    "goals your real life can hold",
  ],
  "/advocacy-faith": [
    "invisible illness advocacy",
    "late diagnosis advocacy",
    "chronic illness and faith",
    "neurodivergent Christian",
    "unanswered prayer",
    "chronic illness in the church",
    "Amplify the Gospel",
    "faith-based speaker and radio presenter",
  ],
  "/on-the-record": [
    "DK Jonah interviews",
    "DK Jonah podcast",
    "radio host and presenter",
    "Reconcilers Radio",
    "summits and stages",
    "media appearances",
    "speaker bio and press",
  ],
  "/articles": [
    "essays on chronic illness",
    "essays on neurodiversity",
    "faith and rest essays",
    "hidden captivity essay",
    "autonomy and independence",
    "rest without guilt",
    "living with invisible illness",
    "reflections by DK Jonah",
  ],
  "/toolkit": [
    "energy check-in tool",
    "pacing tools for chronic illness",
    "capacity-based weekly planner",
    "emotional check-in questions",
    "decision making tool",
    "journal prompts for rest",
    "how to ask for help",
    "five-minute self check-in tools",
  ],
  "/toolkit/pace-energy-check": [
    "PACE Energy Check",
    "energy check-in",
    "pacing for chronic illness",
    "how much energy do I have today",
    "spoon theory check-in",
    "body energy and mind check",
  ],
  "/toolkit/mindless-flow": [
    "Mindless Flow",
    "timed writing exercise",
    "five-minute journaling",
    "stream of consciousness writing",
    "writing prompts for overwhelm",
  ],
  "/toolkit/hawfa-check-in": [
    "HAWFA Check-In",
    "how are you really",
    "emotional check-in tool",
    "self check-in questions",
    "honest answer to how are you",
  ],
  "/toolkit/decision-for-now": [
    "Decision for Now",
    "decision making tool",
    "how to make a decision when overwhelmed",
    "cost of a decision in time energy money and peace",
    "Decisions That Work",
  ],
  "/toolkit/pace-week-planner": [
    "PACE Week Planner",
    "capacity-based weekly planner",
    "low energy week planner",
    "weekly planner for chronic illness",
    "flexible focus tasks",
  ],
  "/toolkit/words-for-asking-for-help": [
    "Words for Asking for Help",
    "how to ask for help",
    "explaining invisible illness to other people",
    "scripts for asking for help at work",
    "wording for adjustments and accommodations",
  ],
  "/toolkit/rest-without-guilt-prompts": [
    "Rest Without Guilt Prompts",
    "rest without guilt",
    "journal prompts for rest",
    "guilt about resting",
    "rest journaling",
  ],
  "/quiet-focus": [
    "Quiet Focus letters",
    "DK Jonah newsletter",
    "email letters on chronic illness and faith",
    "neurodivergent newsletter",
    "slow newsletter one idea at a time",
    "join Quiet Focus",
  ],
  "/find-me": [
    "DK Jonah links",
    "The NO GraGra Practice",
    "Amplify the Gospel",
    "DK Jonah Substack",
    "DK Jonah shop",
    "DK Jonah books",
    "The Curious Creative",
    "Leverage",
  ],
  "/faq": [
    "DK Jonah FAQ",
    "what is NO GraGra",
    "what is hidden captivity",
    "what does HAWFA mean",
    "what is PACE",
    "how to book DK Jonah",
    "how to work with DK Jonah",
  ],
};

const dedupe = (list: string[]) => {
  const seen = new Set<string>();
  return list.filter((item) => {
    const key = item.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

// A page's own phrases first, then the site-wide ones. Pages with no entry (legal) get the site-wide list.
export const keywordsFor = (path: string, extra: string[] = []) =>
  dedupe([...extra, ...(pageKeywords[path] ?? []), ...siteKeywords]);
