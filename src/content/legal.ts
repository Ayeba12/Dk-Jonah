export const legalPages = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    intro:
      "This privacy policy explains how DK Jonah may handle information shared through contact and newsletter forms.",
    sections: [
      ["Information collected", "Contact and newsletter forms may collect details a visitor chooses to submit, such as name, email address, and message."],
      ["How information is used", "Submitted information is used to respond to notes, send Quiet Circle letters, share DK Jonah updates, and improve the website experience."],
      ["Your choices", "Visitors can request updates or deletion of submitted information by contacting DK Jonah. Newsletter subscribers can unsubscribe anytime."],
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    intro:
      "This cookie policy describes how cookies may be used to keep the DK Jonah website reliable and useful.",
    sections: [
      ["Essential cookies", "Essential cookies may help the website remember technical preferences and keep forms or navigation working reliably."],
      ["Analytics cookies", "Analytics cookies may be used to understand aggregate traffic and improve content decisions without identifying personal health details."],
      ["Managing cookies", "Visitors can manage cookie preferences through their browser settings."],
    ],
  },
  {
    slug: "terms-and-conditions",
    title: "Terms and Conditions",
    intro:
      "These terms outline the expected use of the DK Jonah website, writing, and resources.",
    sections: [
      ["Website use", "Visitors agree to use the website respectfully and not attempt to disrupt its functionality or community intent."],
      ["Content ownership", "Writing, resources, images, and design work shown on the site belong to DK Jonah or their respective owners unless stated otherwise."],
      ["No medical advice", "DK Jonah shares reflections and gentle resources. It does not provide medical, mental health, or crisis support and should not replace trusted professional care."],
    ],
  },
];

export const getLegalPage = (slug: string) =>
  legalPages.find((page) => page.slug === slug);
