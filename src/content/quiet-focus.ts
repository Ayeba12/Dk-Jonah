// Quiet Focus page. Wording locked in the Quiet Focus Page Working Document, version 5.
// Every "Join Quiet Focus" button on the site leads here. "What arrives" matches the Home page word for word.

export const QUIET_FOCUS_EMAIL = "hello@dkjonah.com";
export const TIKTOK_URL = "https://tiktok.com/@dkjonah";

export const quietFocusSEO = {
  title: "Quiet Focus",
  description:
    "Quiet Focus is the quiet you need to do what needs to be done. Short letters from DK Jonah, one idea at a time. Nothing you have to keep up with.",
};

export const qfHeroContent = {
  eyebrow: "Quiet Focus",
  headline: "A place to come back to",
  line: "The quiet you need to do what needs to be done.",
  cta: { label: "Come in", href: "#sign-up" },
  small: "Not a classroom. Not a stage.",
  // The page image DK asked for: a quiet room, natural light, no people, no screens.
  image: "/assets/avenzor/images/quiet-focus-hero.webp",
};

export const whatQuietFocusIsContent = {
  headline: "Focus does not have to be loud",
  body: "Most of what we are taught about focus is noise: push harder, move faster, prove you are serious. Quiet Focus is the opposite. It is the silence you need to hear yourself, see what matters and do what needs to be done, one honest step at a time.",
  pullLine: "Quiet is not the absence of work. It is the absence of noise.",
};

export const comeAsYouAreContent = {
  headline: "You do not have to arrive ready",
  body: "You do not need to be organised, rested or sure of what you want. You do not need to know how to do the things that need doing. Come as you are. Get comfy with productivity again, at a pace your life can hold, with me beside you as your guide.",
};

export const whyIBuiltItContent = {
  headline: "I needed the quiet first",
  paragraphs: [
    "My mind races. For a long time I filled every quiet moment with something, because stillness felt uncomfortable and slowing down felt like falling behind.",
    "Over time I learnt that silence is not empty. When pressure, illness, uncertainty or too many ideas make it hard to hear myself, quiet is how I find my way back to what is mine.",
    "It did not make me do less. It helped me do what mattered. I built Quiet Focus so you do not have to find that quiet on your own.",
  ],
  emphasis: "I built Quiet Focus so you do not have to find that quiet on your own.",
};

export const whatArrivesContent = {
  headline: "What arrives",
  items: [
    { lead: "The letter:", rest: " short, one idea at a time. Nothing you have to keep up with." },
    { lead: "First reading", rest: " of new reflections" },
    { lead: "New tools", rest: " from the Routine Ready Toolkit" },
    { lead: "Dates for The Curious Creative,", rest: " my live sessions on TikTok" },
    { lead: "No pressure and no shame,", rest: " and easy to leave whenever you like" },
  ],
};

export const signUpContent = {
  anchor: "sign-up",
  headline: "Come in",
  body: "Leave your name and email. The first letter will tell you what to expect.",
  fields: { firstName: "First name", email: "Email" },
  button: "Come in",
  underButton: "Not a classroom. Not a stage. Leave whenever you like.",
  privacy: { lead: "Your email stays with me. Read the ", link: "Privacy Policy", href: "/legal/privacy-policy" },
};

export const thankYouContent = {
  eyebrow: "Quiet Focus",
  headline: "You are in",
  body: "There is an email on its way to confirm it. Once you have clicked that, you are on the list properly.",
  nothingElse: "Nothing else will arrive today.",
  letterLine: "When the letter comes, it will be short, one idea at a time. Nothing you have to keep up with.",
  whileHereLabel: "While you are here",
  whileHere: [
    {
      lead: "Try the PACE Energy Check.",
      rest: " Four quick questions and a pace for today.",
      cta: "Start here",
      href: "/toolkit/pace-energy-check",
    },
    {
      lead: "The Curious Creative.",
      rest: " My live sessions on TikTok, where you can work alongside me.",
      cta: "Find it on TikTok",
      href: TIKTOK_URL,
    },
  ],
  noRush: "No rush on either.",
  questionLabel: "One question, if you have thirty seconds",
  question: "What made you come in? One line is plenty.",
  questionCta: { label: "Reply by email", href: `mailto:${QUIET_FOCUS_EMAIL}?subject=What made me come in` },
  // The sending address is still to be confirmed by DK; hello@dkjonah.com stands in for now.
  closing: `If the confirmation email does not arrive, check your spam or promotions folder, and add ${QUIET_FOCUS_EMAIL} to your contacts so the letters land where you will see them.`,
};
