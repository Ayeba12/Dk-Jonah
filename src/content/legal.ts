export const legalPages = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    intro:
      "This privacy policy explains how DK Jonah may handle information shared through contact and newsletter forms.",
    sections: [
      [
        "1. Overview & Scope",
        "Welcome to DK Jonah. We value your trust and are committed to protecting your personal information. This Privacy Policy details how we collect, use, store, and share information when you visit our website, sign up for our newsletter, or use our contact form."
      ],
      [
        "2. Information We Collect",
        "We only collect information that you voluntarily provide to us. When you subscribe to our newsletter ('Quiet Circle') or submit a note through our contact form, we collect your name, email address, and the content of your message. We also automatically gather minor technical data through cookies, such as your IP address, browser type, and page interaction details to improve your browsing experience."
      ],
      [
        "3. How We Use Your Information",
        "We use the collected information for specific, transparent purposes: to send you our newsletter updates, respond directly to your messages, monitor website traffic, and maintain website stability. We never sell, rent, or trade your personal information to third parties."
      ],
      [
        "4. Data Retention & Security",
        "We retain your personal data only as long as necessary to provide the services you requested. We use industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. However, please remember that no method of transmission over the internet is 100% secure."
      ],
      [
        "5. Third-Party Services",
        "We may use trusted third-party services to run our website and deliver newsletters (such as WPGraphQL, hosting providers, or email delivery systems). These third parties have access to your details only to perform tasks on our behalf and are obligated not to disclose or use it for any other purpose."
      ],
      [
        "6. Your Rights",
        "You have the right to request access to the personal data we hold about you, request corrections to inaccurate details, or request that we delete your information. You can unsubscribe from our newsletter at any time by clicking the link at the bottom of any email or by reaching out to us directly."
      ]
    ]
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    intro:
      "This cookie policy describes how cookies may be used to keep the DK Jonah website reliable and useful.",
    sections: [
      [
        "1. What Are Cookies",
        "Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work more efficiently, improve user experience, and provide web usage information to the site owners."
      ],
      [
        "2. Essential Cookies",
        "These cookies are necessary for the website to function properly. They handle features like secure form submissions, page navigation, and saving basic system preferences. Without these cookies, some parts of our website might not work correctly. These are enabled automatically."
      ],
      [
        "3. Performance & Analytics Cookies",
        "We use minor analytical tools to understand how visitors interact with our site, which pages are visited most, and where we can improve. This information is aggregated and completely anonymized—it does not track personal identity or sensitive data."
      ],
      [
        "4. Functionality & Choice",
        "If you consent to cookies via our consent banner, we will save your preference so you do not see the banner on every page load. You can always change your mind and manage cookie preferences in your browser settings."
      ],
      [
        "5. How to Control Cookies",
        "Most web browsers allow you to control cookies through their settings. You can choose to block all cookies, accept only essential cookies, or delete existing cookies. Please check your browser's Help section for details."
      ]
    ]
  },
  {
    slug: "terms-and-conditions",
    title: "Terms and Conditions",
    intro:
      "These terms outline the expected use of the DK Jonah website, writing, and resources.",
    sections: [
      [
        "1. Acceptance of Terms",
        "By accessing and browsing the DK Jonah website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website."
      ],
      [
        "2. Purpose of the Site",
        "DK Jonah is a space dedicated to sharing personal reflections, writing, and gentle resources related to chronic illness, neurodivergence, faith, and lifestyle. All content is for informational and creative purposes only."
      ],
      [
        "3. Medical Disclaimer",
        "IMPORTANT: The reflections, essays, and resources shared on this website represent personal experiences and are not medical, psychological, or crisis advice. They should not replace professional medical diagnosis, treatment, or therapy. Always seek the advice of your physician or qualified health provider with any questions you may have regarding a medical or mental health condition."
      ],
      [
        "4. Intellectual Property",
        "Unless otherwise stated, all materials on this website—including text, graphics, design layout, photography, and resources—are the intellectual property of DK Jonah. You may read, print, and save content for personal, non-commercial use. Any redistribution, commercial exploitation, or modification of this content without prior written permission is strictly prohibited."
      ],
      [
        "5. User Conduct",
        "We welcome thoughtful interaction. However, you agree to use our website and contact forms respectfully. You must not use this site to post or transmit abusive, harmful, or defamatory content, or attempt to disrupt the site's technical functionality."
      ],
      [
        "6. Limitation of Liability",
        "DK Jonah makes no warranties or guarantees regarding the accuracy, completeness, or availability of the website content. We will not be liable for any direct or indirect damages arising out of your access to or use of this website."
      ],
      [
        "7. Contact & Updates",
        "We may update these terms from time to time. Your continued use of the website following changes means you accept the updated terms. If you have any questions, please contact us."
      ]
    ]
  }
];

export const getLegalPage = (slug: string) =>
  legalPages.find((page) => page.slug === slug);
