// Advocacy and Faith page. Wording locked in the Advocacy and Faith Page Working Document, version 2.
// Amplify the Gospel has no link yet, so it points at Find me for now. The Unsaid has no page yet.

const LINK_TO_COME = "/find-me";

export const advocacySEO = {
  title: "Advocacy and Faith",
  description:
    "DK Jonah uses her voice, her radio work and her faith to bring hidden things into the open: invisible illness, late diagnosis, unanswered prayer, and the right to be heard.",
};

export const advocacyHeroContent = {
  eyebrow: "Advocacy and faith",
  headline: "A voice where silence costs people",
  body: "Some things get harder because we are expected to hide them. An illness nobody can see. A diagnosis that came late. A prayer that has not been answered. I use my voice, my radio work and my faith to bring those things into the open, so people get the understanding and support they need.",
  image: "/assets/avenzor/images/advocacy-hero.webp",
};

export const advocacyContent = {
  eyebrow: "Advocacy",
  headline: "Lived experience belongs in the design",
  paragraphs: [
    "I know what it is to have to fight to be believed. Now I sit in the rooms where decisions about mental health, learning disability and autism services are made, and I make sure the people who live with those decisions are heard.",
    "That includes NHS People Participation in North East London, The Collaborative and Project Social.",
  ],
  speakUpLabel: "What I speak up about",
  speakUp: [
    { title: "Autism and late diagnosis in adults", image: "/assets/avenzor/images/advocacy-autism.webp" },
    { title: "Chronic pain and invisible illness", image: "/assets/avenzor/images/advocacy-pain.webp" },
    { title: "Mental health and patient voice", image: "/assets/avenzor/images/advocacy-voice.webp" },
    { title: "Identity and belonging", image: "/assets/avenzor/images/advocacy-belonging.webp" },
  ],
};

export const faithContent = {
  eyebrow: "Faith",
  headline: "Faith is not a footnote. It is architecture.",
  paragraphs: [
    "My Christian faith shapes how I see purpose, dignity, truth and stewardship. It is not something I add on top of the work. It is how I listen, and it is why I believe people deserve better.",
    "Through Amplify the Gospel, I help churches and Christian communicators work out what God has given them to carry, then build the people, purpose and platforms to carry it well.",
  ],
  amplify: { label: "Visit Amplify the Gospel", href: LINK_TO_COME },
  scripture: {
    text: "For the earth shall be filled with the knowledge of the glory of the LORD, as the waters cover the sea.",
    reference: "Habakkuk 2:14 (KJV)",
  },
};

export const unsaidContent = {
  eyebrow: "Coming soon",
  headline: "The Unsaid",
  line: "Honest Christian conversations about what people carry quietly. A new project I am building with REMEC.",
  body: "Chronic illness. Mental health. Unanswered prayer. Church hurt. Family wounds. Shame. Things many of us carry into church and never say out loud. The Unsaid will make room to talk about them without losing sight of God. Not to expose anyone. To heal, and to reconnect.",
  tags: ["Unanswered prayer", "Church hurt", "Chronic illness", "Family wounds", "Mental health", "Shame"],
};

export const broadcastingContent = {
  eyebrow: "Broadcasting",
  headline: "Stories can heal what silence divides",
  shows: [
    {
      title: "His and Our Stories",
      meta: "Reconcilers Radio, from 2016",
      desc: "My radio show. Long conversations about faith, life, calling and the stories behind people's public work.",
    },
    {
      title: "Programme direction",
      meta: "The Reconcilers",
      desc: "Today I help shape programming that puts testimony, listening and practical reconciliation first.",
    },
  ],
  closingLine:
    "The common thread is ownership: of your story, your decisions, your voice, your faith, and your right to be heard in the systems that shape your life.",
  image: "/assets/avenzor/images/speaking-studio.webp",
};

export const nextStepContent = {
  headline: "Bring this conversation to your church or organisation",
  primaryCta: { label: "Invite me to speak", href: "/speaking#enquiry" },
  secondaryCta: { label: "Join Quiet Focus", href: "/quiet-focus" },
};
