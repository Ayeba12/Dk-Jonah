// FAQ page. Wording locked in the FAQ Page Working Document, version 2. Linked from the footer.
// Answers reuse wording already locked on other pages, so change those pages first if anything moves.

export const FAQ_EMAIL = "hello@dkjonah.com";

export const faqSEO = {
  title: "FAQ",
  description:
    "The things people usually ask DK Jonah before they join, book or buy: getting started, NO GraGra, hidden captivity, HAWFA, PACE, working together, speaking, faith, books and email.",
};

export type FaqLink = { label: string; href: string };

export type FaqItem = {
  question: string;
  answer: string;
  // Where the answer points. Shown as small links beneath the words so the locked wording stays whole.
  links?: FaqLink[];
};

export type FaqGroup = {
  id: string;
  label: string;
  items: FaqItem[];
};

export const faqHeroContent = {
  eyebrow: "Questions",
  headline: "The things people usually ask me",
  bodyLead: "If your question is not here, email me at ",
  email: FAQ_EMAIL,
  bodyEnd: ".",
};

export const faqGroups: FaqGroup[] = [
  {
    id: "getting-started",
    label: "Getting started",
    items: [
      {
        question: "I do not know where to start.",
        answer:
          "Start small. Try the PACE Energy Check: four quick questions and a pace for today. If you want to stay close without doing anything yet, join Quiet Focus. If you already know you want support, go to Work with me.",
        links: [
          { label: "PACE Energy Check", href: "/toolkit/pace-energy-check" },
          { label: "Quiet Focus", href: "/quiet-focus" },
          { label: "Work with me", href: "/work" },
        ],
      },
      {
        question: "What is Quiet Focus?",
        answer:
          "Short letters from me, one idea at a time. You get first reading of new reflections, new tools from the Routine Ready Toolkit, and dates for my live sessions. Nothing you have to keep up with, and you can leave whenever you like.",
        links: [
          { label: "Join Quiet Focus", href: "/quiet-focus" },
          { label: "The Routine Ready Toolkit", href: "/toolkit" },
        ],
      },
      {
        question: "How often will you email me?",
        answer: "Short letters, one idea at a time. If you miss a few, nothing is lost.",
      },
      {
        question: "Can I use the tools on this website?",
        answer:
          "Yes. The Routine Ready Toolkit tools work right here on the page, in five minutes or less. Use one, use a few, or come back when you need them.",
        links: [{ label: "Open the Toolkit", href: "/toolkit#tools" }],
      },
    ],
  },
  {
    id: "words",
    label: "Words you will see here",
    items: [
      {
        question: "What does NO GraGra mean?",
        answer:
          "Gra gra is noise, force and looking busy. NO GraGra is the opposite: no noise, no panic, no pressure, just rhythm. Slow first. Then precise.",
      },
      {
        question: "What is hidden captivity?",
        answer:
          "It is when a capable, trusted, busy person is quietly living by rules they never chose: the need to prove, to hold it together, to keep going when their body or mind is asking them to stop. Nobody else can see it, so it rarely gets named.",
      },
      {
        question: "What does HAWFA mean?",
        answer:
          "HAWFA? means “How are you?” It is the greeting we answer without thinking. The HAWFA Check-In asks it again, and again, until the true answer comes out.",
        links: [{ label: "HAWFA Check-In", href: "/toolkit/hawfa-check-in" }],
      },
      {
        question: "What is PACE?",
        answer: "PACE is how I plan work around the capacity you really have. HAWFA is for you. PACE is for your work.",
        links: [
          { label: "PACE Energy Check", href: "/toolkit/pace-energy-check" },
          { label: "PACE Week Planner", href: "/toolkit/pace-week-planner" },
        ],
      },
    ],
  },
  {
    id: "working-with-me",
    label: "Working with me",
    items: [
      {
        question: "What is the difference between this website, The Autonomy Code and The NO GraGra Practice?",
        answer:
          "This website is my personal home: my story, writing, speaking and everyday tools. The Autonomy Code is my coaching practice. The NO GraGra Practice is the home of my programmes, tools and resources. You can find all three on the Find me page.",
        links: [{ label: "Find me", href: "/find-me#practices" }],
      },
      {
        question: "Do you only work with people who have a chronic illness or are neurodivergent?",
        answer:
          "No. My lived experience shapes how I work, but I work with anyone who is capable, busy and tired of living by rules they never chose. That includes founders, leaders, creatives, churches and organisations.",
      },
      {
        question: "How do I work with you one to one?",
        answer:
          "My coaching happens through The Autonomy Code. It starts with the Ownership Scan, so you know where you stand before we begin. Details are on The Autonomy Code website.",
        // The Autonomy Code website link is still to come from DK. Until then, point at its card on Find me.
        links: [{ label: "The Autonomy Code", href: "/find-me#practices" }],
      },
      {
        question: "Do you work with organisations?",
        answer:
          "Yes. When an organisation knows more than it can explain, I help turn that knowledge into something people can follow: guidance, doctrine, training or a message everyone understands. See Work with me.",
        links: [{ label: "Work with me", href: "/work" }],
      },
      {
        question: "I am not sure which option fits me.",
        answer:
          "Send me a short email about where you are and what you want to change. I will tell you honestly which option fits, even if it is not one of mine.",
        links: [{ label: FAQ_EMAIL, href: `mailto:${FAQ_EMAIL}` }],
      },
    ],
  },
  {
    id: "speaking",
    label: "Speaking",
    items: [
      {
        question: "How do I invite you to speak?",
        answer:
          "Use the enquiry form on the Speaking page. Tell me who will be in the room, what they are carrying, and what you want them to leave able to do.",
        links: [{ label: "Speaking enquiry form", href: "/speaking#enquiry" }],
      },
      {
        question: "What do you speak about?",
        answer:
          "Goal setting and planning that survives real life, living with long-term illness and neurodiversity, being heard inside health systems, faith without performance, and growing without losing yourself.",
        links: [{ label: "Speaking topics", href: "/speaking#topics" }],
      },
      {
        question: "Do you speak in churches?",
        answer:
          "Yes. I speak in churches and faith communities, as well as organisations, health services, conferences, podcasts and radio.",
      },
      {
        question: "Can you speak online, or build a talk around our theme?",
        answer: "Yes to both. I speak online or in person, and if your event has a theme, I can build the talk around it.",
      },
      {
        question: "How much do you charge?",
        answer:
          "It depends on the event, the length and the travel. Share your budget or honorarium in the enquiry form and I will come back to you.",
        links: [{ label: "Speaking enquiry form", href: "/speaking#enquiry" }],
      },
    ],
  },
  {
    id: "faith",
    label: "Faith",
    items: [
      {
        question: "Is this a Christian website?",
        answer:
          "My Christian faith shapes everything I do. It is how I listen, and why I believe people deserve better. You do not need to share my faith to find something useful here.",
        links: [{ label: "Advocacy and Faith", href: "/advocacy-faith" }],
      },
      {
        question: "What is Amplify the Gospel?",
        answer:
          "My faith-based work, for churches, ministries and Christian communicators. I help you work out what God has given you to carry, then build the people, purpose and platforms to carry it well.",
        links: [{ label: "Amplify the Gospel", href: "/find-me#practices" }],
      },
    ],
  },
  {
    id: "books-tools-email",
    label: "Books, tools and your email",
    items: [
      {
        question: "Where can I buy your books and tools?",
        answer:
          "In my shop: guides, workbooks and self-paced tools, including Do It Yourself Branding. You can start the day you buy. Prices are in pounds and naira.",
        links: [{ label: "My shop", href: "/find-me#shop" }],
      },
      {
        question: "What happens to my email address?",
        answer:
          "Your email stays with me. I use it to send you what you signed up for, and you can leave whenever you like. The Privacy Policy has the details.",
        links: [{ label: "Privacy Policy", href: "/legal/privacy-policy" }],
      },
    ],
  },
];

export const faqCloseContent = {
  headline: "Still wondering about something?",
  bodyLead: "Email me at ",
  email: FAQ_EMAIL,
  bodyEnd: ". A short message is plenty.",
  primary: { label: "Email me", href: `mailto:${FAQ_EMAIL}` },
  secondary: { label: "Join Quiet Focus", href: "/quiet-focus" },
};
