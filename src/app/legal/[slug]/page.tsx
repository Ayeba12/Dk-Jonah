import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getLegalPage, legalPages } from "@/content/legal";
import { profile } from "@/content/portfolio";

type LegalPageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = () =>
  legalPages.map((page) => ({ slug: page.slug }));

export const generateMetadata = async ({
  params,
}: LegalPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const page = getLegalPage(slug);

  if (!page) {
    return { title: "Legal" };
  }

  return {
    title: page.title,
    description: page.intro,
  };
};

export default async function LegalPage({ params }: LegalPageProps) {
  const { slug } = await params;
  const page = getLegalPage(slug);

  if (!page) {
    notFound();
  }

  // Helper to slugify section titles for anchor links
  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  return (
    <section className="section-padding min-h-screen bg-[#fffaf2] pt-32 pb-24 md:pt-40">
      <div className="container-shell max-w-6xl">
        {/* Dynamic Header */}
        <div className="mb-12 border-b border-[#ded2c1] pb-10">
          <p className="mb-3 text-xs tracking-widest uppercase text-[#b68a3a] font-semibold">
            [ Legal Documentation ]
          </p>
          <h1 className="font-display text-5xl font-semibold leading-tight text-[#111111] md:text-7xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#7a7065] md:text-xl md:leading-8">
            {page.intro}
          </p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
          
          {/* Sticky Sidebar */}
          <aside className="space-y-8 lg:sticky lg:top-28 lg:h-fit">
            
            {/* Document Switcher */}
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#7a7065]/60">
                Documents
              </h3>
              <nav className="flex flex-col gap-2">
                {legalPages.map((p) => {
                  const isActive = p.slug === slug;
                  return (
                    <Link
                      href={`/legal/${p.slug}`}
                      key={p.slug}
                      className={`group flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-[#ead9ad]/20 text-[#b68a3a] shadow-sm font-semibold"
                          : "text-[#7a7065] hover:bg-[#ded2c1]/20 hover:text-[#111111]"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full bg-[#b68a3a] transition-all duration-300 ${
                          isActive ? "scale-100 opacity-100" : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-50"
                        }`}
                      />
                      {p.title}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Table of Contents */}
            <div className="hidden border-t border-[#ded2c1]/60 pt-6 lg:block">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#7a7065]/60">
                On This Page
              </h3>
              <nav className="flex flex-col gap-3">
                {page.sections.map(([title]) => {
                  const sectionSlug = slugify(title);
                  return (
                    <a
                      href={`#${sectionSlug}`}
                      key={title}
                      className="text-xs text-[#7a7065] transition-colors duration-200 hover:text-[#b68a3a] hover:underline"
                    >
                      {title}
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Support / Quick Box */}
            <div className="rounded-xl border border-[#ded2c1] bg-[#fffaf2] p-5 shadow-sm">
              <h4 className="text-sm font-semibold text-[#111111]">Got Questions?</h4>
              <p className="mt-2 text-xs leading-relaxed text-[#7a7065]">
                If you have any questions regarding our policies, feel free to contact us.
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-4 inline-block text-xs font-bold text-[#b68a3a] hover:underline transition-all duration-200"
              >
                {profile.email} &rarr;
              </a>
            </div>

          </aside>

          {/* Main Legal Content */}
          <article className="space-y-12">
            <div className="rounded-2xl border border-[#ded2c1] bg-white p-6 shadow-sm sm:p-10 md:p-12">
              <div className="space-y-10">
                {page.sections.map(([title, text]) => {
                  const sectionSlug = slugify(title);
                  return (
                    <section
                      id={sectionSlug}
                      key={title}
                      className="scroll-mt-28 border-b border-[#ded2c1]/40 pb-8 last:border-b-0 last:pb-0"
                    >
                      <h2 className="font-display text-2xl font-semibold text-[#111111] md:text-3xl">
                        {title}
                      </h2>
                      <p className="mt-4 text-base leading-relaxed text-[#7a7065] md:text-lg md:leading-8 whitespace-pre-line">
                        {text}
                      </p>
                    </section>
                  );
                })}
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}
