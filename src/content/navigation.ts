export type NavLink = { label: string; href: string };

// Grouped under "My work" in the header.
export const myWorkLinks: NavLink[] = [
  { label: "Work with me", href: "/work" },
  { label: "Speaking", href: "/speaking" },
  { label: "Advocacy and Faith", href: "/advocacy-faith" },
];

// Final menu from the handover pack:
// About · Work with me · Speaking · Advocacy and Faith · Writing · Toolkit · Quiet Focus · Find me
// Writing (the Reflections archive) will move to /writing once the essays land.
export const navLinks: NavLink[] = [
  { label: "About", href: "/about" },
  ...myWorkLinks,
  { label: "Writing", href: "/articles" },
  { label: "Toolkit", href: "/toolkit" },
  { label: "Quiet Focus", href: "/quiet-focus" },
  { label: "Find me", href: "/find-me" },
];

export const footerNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  ...navLinks,
  { label: "FAQ", href: "/faq" },
  { label: "On the Record", href: "/on-the-record" },
];

export const socialLinks: NavLink[] = [
  { label: "Instagram", href: "https://instagram.com/dkjonah" },
  { label: "X", href: "https://x.com/dkjonah" },
  { label: "Facebook", href: "https://facebook.com/dkjonah" },
  { label: "TikTok", href: "https://tiktok.com/@dkjonah" },
  { label: "LinkedIn", href: "https://linkedin.com/in/dkjonah" },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Cookie Policy", href: "/legal/cookie-policy" },
  { label: "Terms and Conditions", href: "/legal/terms-and-conditions" },
];

export const headerCta: NavLink = { label: "Join Quiet Focus", href: "/quiet-focus" };
