// Find me page. Wording locked in the Find Me Page Working Document, version 3. Replaces Contact.
// External links are still to come from DK: an `href` of null renders the button without a destination.

export const FIND_ME_EMAIL = "hello@dkjonah.com";

export const findMeSEO = {
  title: "Find me",
  description:
    "Everywhere DK Jonah is, in one place: The Autonomy Code, The NO GraGra Practice, Amplify the Gospel, Quiet Focus, Substack, Leverage, The Curious Creative and the shop.",
};

export type PlaceCard = {
  title: string;
  desc: string;
  cta: string;
  href: string | null;
  image: string;
  external?: boolean;
};

export const findMeHeroContent = {
  eyebrow: "Find me",
  headline: "Everywhere I am, in one place",
  body: "My work lives in a few different homes. Here is what each one is, so you can go straight to the one you need.",
};

export const practicesContent = {
  headline: "My practices",
  cards: [
    {
      title: "The Autonomy Code",
      desc: "My coaching practice for capable people who are tired of living by rules they never chose. Together we look at five parts of your life and work: who you are, what you say, where you are going, what you have to work with, and who is around you. We find where you have handed your life away, and build a way to take it back. It starts with the Ownership Scan, so you know where you stand before we begin.",
      cta: "Visit The Autonomy Code",
      href: null,
      image: "/assets/avenzor/images/findme-autonomy.webp",
      external: true,
    },
    {
      title: "The NO GraGra Practice",
      desc: "Gra gra is noise, force and looking busy. NO GraGra is the opposite: no noise, no panic, no pressure, just rhythm. This is the home of my programmes, tools and resources for building your life and work at a pace you can actually keep.",
      cta: "Visit The NO GraGra Practice",
      href: null,
      image: "/assets/avenzor/images/findme-nogragra.webp",
      external: true,
    },
    {
      title: "Amplify the Gospel",
      desc: "My faith-based work, for churches, ministries and Christian communicators. I help you work out what God has given you to carry, then build the people, purpose and platforms to carry it well.",
      cta: "Visit Amplify the Gospel",
      href: null,
      image: "/assets/avenzor/images/record-amplify.webp",
      external: true,
    },
  ] satisfies PlaceCard[],
};

export const readSubscribeContent = {
  headline: "Read and subscribe",
  cards: [
    {
      title: "Quiet Focus",
      desc: "Short letters from me, one idea at a time. First reading of new reflections, new tools, and dates for my live sessions. Nothing you have to keep up with.",
      cta: "Join Quiet Focus",
      href: "/quiet-focus",
      image: "/assets/avenzor/images/quiet-focus-hero.webp",
    },
    {
      title: "DK Jonah on Substack",
      desc: "My personal writing. Faith, illness, neurodiversity, rest and the questions I am still working through, written from the inside.",
      cta: "Subscribe on Substack",
      href: null,
      image: "/assets/avenzor/images/tool-mindless-flow.webp",
      external: true,
    },
    {
      title: "The NO GraGra Practice on Substack",
      desc: "Practical writing on planning, pace and getting things done without shame, including the Comfy Productivity series.",
      cta: "Subscribe on Substack",
      href: null,
      image: "/assets/avenzor/images/tool-week-planner.webp",
      external: true,
    },
    {
      title: "Leverage",
      desc: "My LinkedIn newsletter for people who want to use their skills and ideas well online. How to say what you mean clearly, without shrinking yourself to fit a niche.",
      cta: "Subscribe on LinkedIn",
      href: null,
      image: "/assets/avenzor/images/role-architect.webp",
      external: true,
    },
    {
      title: "Reflections",
      desc: "Essays on this website for the quiet questions you carry.",
      cta: "Read reflections",
      href: "/articles",
      image: "/assets/avenzor/images/quiet-moment-reading.webp",
    },
  ] satisfies PlaceCard[],
};

export const joinLiveContent = {
  headline: "Join me live",
  card: {
    title: "The Curious Creative",
    desc: "My live series on TikTok. I follow whatever I am curious about, and we co-work together, so you can get your own work done alongside me. Dates arrive in Quiet Focus first.",
    cta: "Follow on TikTok",
    href: null,
    image: "/assets/avenzor/images/findme-curious.webp",
    external: true,
  } satisfies PlaceCard,
};

export const shopContent = {
  headline: "Shop",
  card: {
    title: "My shop",
    desc: "Guides, workbooks and self-paced tools, including Do It Yourself Branding. Start the day you buy. Priced in pounds and naira.",
    cta: "Visit my shop",
    href: null,
    image: "/assets/avenzor/images/findme-shop.webp",
    external: true,
  } satisfies PlaceCard,
};

export const socialEmailContent = {
  socialLabel: "Social",
  emailLabel: "Email",
  email: FIND_ME_EMAIL,
  speakingLabel: "Speaking",
  speakingLine: "To invite me to speak, use the enquiry form on the Speaking page.",
  speakingCta: { label: "Invite me to speak", href: "/speaking#enquiry" },
};
