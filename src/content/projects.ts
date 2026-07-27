export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  image: string;
  summary: string;
  description: string;
  scope: string[];
  outcomes: string[];
  readTime?: string;
  categories?: { name: string; slug: string }[];
  tags?: { name: string; slug: string }[];
};

export const projects: Project[] = [
  {
    slug: "energy-check-in",
    title: "Energy Check-In",
    category: "Reflection Tool",
    year: "Start Here",
    image: "/assets/avenzor/images/toolkit-notebook.jpg",
    summary: "A simple prompt set for noticing what your body and mind may need today.",
    description:
      "The Energy Check-In helps you begin with honesty instead of pressure. It gives language to capacity, fatigue, focus, emotion, and the small forms of care that can make a day more livable.",
    scope: ["Body awareness prompts", "Capacity notes", "Gentle next steps"],
    outcomes: ["Name what feels heavy", "Choose a softer pace", "Ask for support with less shame"],
  },
  {
    slug: "soft-week-planner",
    title: "Soft Week Planner",
    category: "Capacity Planner",
    year: "Toolkit",
    image: "/assets/avenzor/images/toolkit-jotter.jpg",
    summary: "A planning page that starts with capacity before tasks.",
    description:
      "The Soft Week Planner is for people whose energy changes. It makes room for priorities, rest, flexible routines, and the truth that consistency can look different in different seasons.",
    scope: ["Capacity-first planning", "Rest windows", "Flexible priorities"],
    outcomes: ["Reduce planning shame", "Protect rest", "Build a week around real capacity"],
  },
  {
    slug: "words-for-asking-for-help",
    title: "Words For Asking For Help",
    category: "Support Language",
    year: "Resource",
    image: "/assets/avenzor/images/toolkit-numinous.jpg",
    summary: "Gentle scripts for naming needs without overexplaining.",
    description:
      "This resource offers soft, clear language for asking for help, setting limits, explaining invisible needs, and staying connected without turning every request into a defense.",
    scope: ["Support scripts", "Boundary language", "Care requests"],
    outcomes: ["Ask with more clarity", "Explain less when needed", "Protect your energy in hard conversations"],
  },
  {
    slug: "rest-without-guilt-prompts",
    title: "Rest Without Guilt Prompts",
    category: "Reflection Tool",
    year: "Toolkit",
    image: "/assets/avenzor/images/toolkit-journal.jpg",
    summary: "Journal prompts for releasing shame around slowness and care.",
    description:
      "A reflective guide containing thoughtful prompts to help you unpack the pressure of constant productivity. Relearn how to rest your body and mind without feeling like you are falling behind or failing.",
    scope: ["Guilt release exercises", "Somatic breathing prompts", "Rest journaling guides"],
    outcomes: ["Unpack productivity shame", "Identify personal rest styles", "Establish guilt-free quiet hours"],
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
