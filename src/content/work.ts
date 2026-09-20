// Work page. Wording locked in the Work Page Working Document, version 3.
// Offer links are placeholders until DK supplies them; those point at Find me for now.

const EMAIL = "hello@dkjonah.com";
const LINK_TO_COME = "/find-me";

export const workSEO = {
  title: "Work with me",
  description:
    "Every way to work with DK Jonah: the Annual Reset, The Autonomy Code, Knowledge Architecture, the Communication Clarity Audit, the Routine Ready Toolkit and speaking.",
};

export const workHeroContent = {
  eyebrow: "Work with me",
  headline: "Let's work on the thing you keep putting off",
  body: "The goal you set every year and never reach. The knowledge you carry but cannot explain. The decision that keeps sitting on your chest. You do not have to sort it out alone, and you do not have to do it all at once.",
  cta: { label: "See how we can work together", href: "#ways" },
};

export type Offer = {
  title: string;
  desc: string;
  cta: string;
  href: string;
  external?: boolean;
};

export type Way = {
  situation: string;
  offers: Offer[];
};

export const waysToWorkContent = {
  anchor: "ways",
  headline: "Start where you are",
  ways: [
    {
      situation: "You want goals you can actually keep",
      offers: [
        {
          title: "The Annual Reset.",
          desc: "Three live evenings at the end of the year. We look at the year you actually lived, then plan a year you can actually hold.",
          cta: "Find out more",
          href: LINK_TO_COME,
        },
      ],
    },
    {
      situation: "You are tired of living by rules you never chose",
      offers: [
        {
          title: "The Autonomy Code.",
          desc: "My coaching practice. It starts with the Ownership Scan, so you know exactly where you are stuck before we do anything else.",
          cta: "Visit The Autonomy Code",
          href: LINK_TO_COME,
        },
      ],
    },
    {
      situation: "You know a lot, but cannot get it into words",
      offers: [
        {
          title: "Knowledge Architecture.",
          desc: "For experts, founders and organisations sitting on years of knowledge that nobody else can use yet.",
          cta: "Find out more",
          href: LINK_TO_COME,
        },
      ],
    },
    {
      situation: "Your message has got lost",
      offers: [
        {
          title: "Communication Clarity Audit.",
          desc: "For organisations where the message has got muddled between the website, the documents and the team.",
          cta: "Find out more",
          href: LINK_TO_COME,
        },
      ],
    },
    {
      situation: "You would rather start on your own",
      offers: [
        {
          title: "The Routine Ready Toolkit.",
          desc: "Everyday tools you can use right now, on this website.",
          cta: "Explore the toolkit",
          href: "/toolkit",
        },
        {
          title: "The Thing AI Can't Copy.",
          desc: "Work out what is truly yours, at your own pace.",
          cta: "Find out more",
          href: LINK_TO_COME,
        },
      ],
    },
    {
      situation: "You want me in the room",
      offers: [
        {
          title: "Speaking.",
          desc: "Talks, workshops and training for churches, organisations and events.",
          cta: "See speaking",
          href: "/speaking",
        },
      ],
    },
  ] satisfies Way[],
};

export const teamsContent = {
  headline: "For teams, services and institutions",
  body: "When an organisation knows more than it can explain, I help turn that knowledge into something people can follow: guidance, doctrine, training or a message everyone understands.",
  cta: { label: "Talk to me about your organisation", href: `mailto:${EMAIL}` },
};

export const workQuotesContent = {
  headline: "What people say",
  quotes: [
    {
      quote:
        "DK is really meticulous and engages both her clients and workers so personally. Combined with her zeal to keep improving, she is easily one of the best in the game.",
      name: "Richard Enake",
      image: "/assets/avenzor/images/testimonial-richard-enake.webp",
      role: null,
    },
    {
      quote:
        "She knows how to stretch and draw the best out of you through her unique hands-on style of delivery.",
      name: "Omosola",
      image: "/assets/avenzor/images/testimonial-omosola.webp",
      role: "Transition Coach and Consultant",
    },
  ],
};

export const notSureContent = {
  headline: "Not sure where to start?",
  body: "Send me a short email about where you are and what you want to change. I will tell you honestly which option fits, even if it is not one of mine.",
  cta: { label: `Email ${EMAIL}`, href: `mailto:${EMAIL}` },
};
