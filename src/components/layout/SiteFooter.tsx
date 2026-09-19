import Link from "next/link";
import { footerNavLinks, legalLinks, socialLinks } from "@/content/navigation";
import { profile } from "@/content/portfolio";

export const SiteFooter = () => (
  <footer className="paper relative overflow-hidden">
    <hr className="thread" />

    <div className="container-shell relative z-10 grid gap-12 pb-20 pt-16 md:grid-cols-[1.1fr_1fr_0.8fr_0.8fr] md:gap-8 md:pt-20">
      <div>
        <p className="max-w-xs text-[15px] leading-relaxed text-black/60">
          {profile.tagline}
        </p>
      </div>

      <div>
        <p className="eyebrow mb-4">Email</p>
        <a
          className="font-display text-2xl font-semibold leading-tight text-black transition-colors hover:text-gold sm:text-3xl"
          href={`mailto:${profile.email}`}
        >
          {profile.email}
        </a>
      </div>

      <FooterColumn label="Menu" links={footerNavLinks} />
      <FooterColumn label="Social" links={socialLinks} />
    </div>

    {/* Watermark, as the reference sets its name across the footer. */}
    <div
      aria-hidden="true"
      className="pointer-events-none relative select-none overflow-hidden leading-none"
    >
      <span className="thread-text font-display block whitespace-nowrap text-[21vw] font-bold uppercase tracking-tight opacity-25 md:-mb-[3vw]">
        DK JONAH
      </span>
    </div>

    <div className="container-shell relative z-10 flex flex-col gap-4 border-t border-black/15 py-6 text-sm text-black/60 md:flex-row md:items-center md:justify-between">
      <p>© 2026 DK Jonah. All rights reserved.</p>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {legalLinks.map((link) => (
          <Link className="transition-colors hover:text-black" href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  </footer>
);

type FooterColumnProps = {
  label: string;
  links: { label: string; href: string }[];
};

const FooterColumn = ({ label, links }: FooterColumnProps) => (
  <div>
    <p className="eyebrow mb-4">{label}</p>
    <ul className="flex flex-col gap-2.5">
      {links.map((link) => {
        const external = link.href.startsWith("http");
        const className =
          "text-[15px] text-black/75 transition-colors hover:text-gold";
        return (
          <li key={link.href}>
            {external ? (
              <a className={className} href={link.href} rel="noreferrer" target="_blank">
                {link.label}
              </a>
            ) : (
              <Link className={className} href={link.href}>
                {link.label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  </div>
);
