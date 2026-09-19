// Speaking page. Wording locked in the Speaking Page Working Document, version 3.
// Every "Invite DK" link on the site leads to the enquiry form at /speaking#enquiry.

export const SPEAKING_EMAIL = "hello@dkjonah.com";

export const speakingSEO = {
  title: "Speaking",
  description:
    "DK Jonah speaks where complex ideas need clear language: goals your real life can hold, lived experience and advocacy, ownership and growth, and faith without performance.",
};

export const speakingHeroContent = {
  eyebrow: "Speaking",
  headline: "I speak where complex ideas need clear language.",
  paragraphs: [
    "Most people do not need another goal. They need a plan that survives a bad week. I help people set goals they can actually keep and plan around the life they really have, with the job, the family, the health and the bills in it.",
    "I also speak about living with long-term illness and neurodiversity, about faith, and about finding the words for what you are carrying.",
  ],
  closingLine: "People leave with a clearer head and one step they can take the next morning.",
  primaryCta: { label: "Invite DK", href: "#enquiry" },
  secondaryCta: { label: "See topics", href: "#topics" },
  image: "/assets/avenzor/images/speaking-hero.webp",
};

export const whatIBringContent = {
  headline: "Depth without distance",
  body: "I am at my best in rooms that do not need another polished speech detached from reality. I bring lived experience and practical structure into the same room, with the kind of direct honesty that helps people see themselves more clearly.",
  stats: [
    { value: "15", label: "Years of practice" },
    { value: "300+", label: "Trained" },
    { value: "150+", label: "Mentored" },
    { value: "30+", label: "Coached" },
  ],
};

export const roomsContent = {
  headline: "Rooms I speak in",
  rooms: [
    "Churches and faith communities",
    "Organisations and leadership teams",
    "Health and public services",
    "Conferences, summits and panels",
    "Podcasts and radio",
    "Community and creative groups",
  ],
};

export const topicsContent = {
  anchor: "topics",
  headline: "Topics",
  groups: [
    {
      theme: "Goals and planning",
      topics: [
        {
          title: "Goals Your Real Life Can Hold.",
          desc: "Goal setting that works with your health, money, work and limits, not a fantasy version of you.",
        },
        {
          title: "Decisions That Work.",
          desc: "Planning and deciding at the pace of your real capacity, so progress brings peace instead of pressure.",
        },
      ],
    },
    {
      theme: "Lived experience and advocacy",
      topics: [
        {
          title: "The Lived Experience Is Part of the Evidence.",
          desc: "Why institutions make better decisions when the people most affected are included as knowledge-holders.",
        },
        {
          title: "Being Heard Inside the System.",
          desc: "Long-term illness, neurodiversity and finding the words to ask for what you need.",
        },
      ],
    },
    {
      theme: "Ownership and growth",
      topics: [
        {
          title: "From Hidden Captivity to Owned Living.",
          desc: "The quiet ways people hand away identity, voice and direction, and how to take them back.",
        },
        {
          title: "Growth Without Self-Abandonment.",
          desc: "Leading and growing well without losing yourself in the process.",
        },
      ],
    },
    {
      theme: "Faith and knowledge",
      topics: [
        {
          title: "Faith Without Performance.",
          desc: "Faith, rest and calling that hold through hard seasons, without pretending to be fine.",
        },
        {
          title: "Make What You Know Usable.",
          desc: "Turning lived wisdom and professional depth into structure others can use.",
        },
      ],
    },
  ],
};

export const formatsContent = {
  headline: "What I can do for your event",
  formats: [
    {
      title: "A talk or teaching,",
      detail: "30 to 60 minutes",
      image: "/assets/avenzor/images/speaking-talk.webp",
    },
    {
      title: "A hands-on workshop,",
      detail: "60 to 120 minutes, where people leave with something written down",
      image: "/assets/avenzor/images/speaking-workshop.webp",
    },
    {
      title: "Half-day or full-day training",
      detail: "for teams",
      image: "/assets/avenzor/images/speaking-training.webp",
    },
    {
      title: "A panel or fireside conversation",
      detail: "",
      image: "/assets/avenzor/images/speaking-panel.webp",
    },
    {
      title: "Podcasts, radio and social media lives",
      detail: "",
      image: "/assets/avenzor/images/speaking-studio.webp",
    },
  ],
  line: "Online or in person. If your event has a theme, I can build the talk around it.",
};

export const whereSpokenContent = {
  headline: "Where I have spoken",
  places: [
    "Queen Mary University of London",
    "NHS North East London, The Collaborative",
    "Reconcilers Radio",
    "Worital Authors Conclave",
    "Thrive Trybe Flourish Summit",
    "Freelancer to CEO Summit",
    "SYNC",
    "Grow Your Show",
    "Early Intervention Matters",
    "Coffee & Oysters",
    "91P Podcast",
  ],
  line: "And several ministries and faith communities.",
  books: { lead: "Author of ", titles: ["No Gra Gra", "Do It Yourself Branding"] },
  onTheRecord: { label: "See everything on the record", href: "/on-the-record" },
};

export const inTheirWordsContent = {
  headline: "In their words",
  quotes: [
    { quote: "I can literally quantify my productivity level.", name: "Dr Amina Omar-Ikaige" },
    { quote: "She did not push me into anything, making her easy to trust.", name: "Ope" },
    { quote: "The business secret every business owner needs.", name: "Fola" },
  ],
};

export const inviteContent = {
  anchor: "enquiry",
  headline: "Start with the room you are trying to change",
  body: "Tell me who will be in the room, what they are carrying, and what you want them to leave able to do.",
  // The locked document adds "I will come back to you within [X] working days."
  // Add it here once DK confirms the number.
  eventKinds: [
    "Church or faith community",
    "Organisation or team",
    "Conference or summit",
    "Podcast, radio or media",
    "Other",
  ],
  sessionKinds: ["Talk or teaching", "Workshop", "Training", "Panel", "Podcast or live", "Not sure yet"],
  submitLabel: "Send enquiry",
  emailLine: "Prefer email?",
};
