export type Article = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  body: string | string[];
  categories?: { name: string; slug: string }[];
  tags?: { name: string; slug: string }[];
};

export const articles: Article[] = [
  {
    slug: "you-are-not-behind-because-your-body-needed-rest",
    title: "You Are Not Behind Because Your Body Needed Rest",
    date: "May 12, 2026",
    readTime: "6 min read",
    image: "/assets/avenzor/images/article-minimalism.png",
    excerpt:
      "A gentle reminder for the days your pace feels smaller than your dreams.",
    body: [
      "Some seasons ask for a slower life than the one you planned. That does not mean you failed. It means your body has been telling the truth about what it can hold.",
      "Rest is not proof that you are weak, lazy, or faithless. Rest can be the most honest form of care when your energy, pain, focus, or emotions are asking to be noticed.",
      "You are allowed to build a meaningful life at a pace that respects your real capacity. The goal is not to force yourself into someone else's rhythm. The goal is to stay connected to the life that is actually yours.",
    ],
  },
  {
    slug: "when-faith-feels-like-pressure-instead-of-peace",
    title: "When Faith Feels Like Pressure Instead Of Peace",
    date: "May 18, 2026",
    readTime: "7 min read",
    image: "/assets/avenzor/images/article-trends.png",
    excerpt:
      "For the person who loves God deeply but is tired of pretending that struggle is simple.",
    body: [
      "Faith can become heavy when people turn it into proof of performance. You pray, you believe, you keep showing up, and still life can feel tender, confusing, or unfinished.",
      "Struggle does not make you less loved. Questions do not make you less faithful. Some prayers are whispered from a tired body, a scattered mind, or a heart that needs refuge more than instruction.",
      "A softer faith does not avoid truth. It makes room for it. It lets you bring sadness, slowness, anger, hope, and uncertainty into the same room without pretending any of it disqualifies you.",
    ],
  },
  {
    slug: "you-are-not-lazy-because-the-system-did-not-fit",
    title: "You Are Not Lazy Because The System Did Not Fit",
    date: "May 24, 2026",
    readTime: "8 min read",
    image: "/assets/avenzor/images/article-process.jpg",
    excerpt:
      "A softer way to think about routines, planning, neurodivergence, and fluctuating capacity.",
    body: [
      "Maybe the planner did not work because it was designed for a nervous system that is not yours. Maybe the morning routine failed because your pain, attention, energy, or caregiving reality needed a different kind of structure.",
      "The problem is not always discipline. Sometimes the problem is a system that assumes every day begins with the same body, the same brain, and the same amount of capacity.",
      "Gentle structure begins with listening. What is true today? What is possible today? What can be made easier, smaller, softer, or more honest? That is where sustainable care starts.",
    ],
  },
  {
    slug: "softness-is-not-a-weakness-to-outgrow",
    title: "Softness Is Not A Weakness To Outgrow",
    date: "May 30, 2026",
    readTime: "5 min read",
    image: "/assets/avenzor/images/hero-portrait.avif",
    excerpt:
      "For the tender person learning that sensitivity can be wisdom, not something to erase.",
    body: [
      "Softness is often treated like a flaw you are supposed to harden out of yourself. But tenderness can be a way of noticing what others rush past.",
      "Being sensitive does not mean you are too much. It may mean your body, mind, and spirit are asking for care before the world has given you permission to need it.",
      "You do not have to become sharp to be safe, useful, or worthy. Sometimes the work is learning how to protect your softness without apologizing for it.",
    ],
  },
];

export const getArticle = (slug: string) =>
  articles.find((article) => article.slug === slug);
