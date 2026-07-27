import Link from "next/link";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { legalLinks, navLinks, socialLinks } from "@/content/navigation";
import { profile } from "@/content/portfolio";

export const SiteFooter = () => (
  <footer className="bg-[#201a16] text-white">
    <section
      className="container-shell grid gap-8 border-b border-white/10 py-16 md:grid-cols-[0.8fr_1.2fr] md:py-24"
      id="quiet-circle"
    >
      <div>
        <p className="mb-4 text-sm text-white/55">[Newsletter]</p>
        <h2 className="font-display text-4xl font-semibold leading-none md:text-6xl">
          Join the Quiet Circle
        </h2>
      </div>
      <div className="md:self-end">
        <p className="mb-8 max-w-xl text-lg leading-7 text-white/62 md:ml-auto md:text-right">
          Slow, thoughtful notes from DK Jonah. No pressure. No performance.
          Just language, reflection, and care for the parts of life that often
          go unseen.
        </p>
        <NewsletterForm />
      </div>
    </section>
    <section className="container-shell grid gap-12 py-12 md:grid-cols-[1.2fr_0.6fr_0.6fr]">
      <div>
        <p className="mb-5 text-sm text-white/45">[Contact]</p>
        <a
          className="font-display text-4xl font-semibold transition-colors hover:text-[#ead9ad] md:text-7xl"
          href={`mailto:${profile.email}`}
        >
          {profile.email}
        </a>
        <p className="mt-6 text-white/45">{profile.role}</p>
      </div>
      <FooterColumn label="[Menu]" links={navLinks} />
      <FooterColumn label="[Social Media]" links={socialLinks} />
    </section>
    <section className="container-shell flex flex-col gap-8 border-t border-white/10 py-8 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="font-display text-5xl font-bold leading-none text-[#ead9ad] md:text-8xl">
          DK JONAH
        </p>
        <p className="mt-3 text-sm text-white/45">© 2026 DK Jonah</p>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/55">
        {legalLinks.map((link) => (
          <Link className="hover:text-white" href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  </footer>
);

type FooterColumnProps = {
  label: string;
  links: { label: string; href: string }[];
};

const FooterColumn = ({ label, links }: FooterColumnProps) => (
  <div>
    <p className="mb-5 text-sm text-white/45">{label}</p>
    <div className="flex flex-col gap-3">
      {links.map((link) => {
        const external = link.href.startsWith("http");

        if (external) {
          return (
            <a
              className="text-lg text-white/80 transition-colors hover:text-[#ead9ad]"
              href={link.href}
              key={link.href}
              rel="noreferrer"
              target="_blank"
            >
              {link.label}
            </a>
          );
        }

        return (
          <Link
            className="text-lg text-white/80 transition-colors hover:text-[#ead9ad]"
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  </div>
);
