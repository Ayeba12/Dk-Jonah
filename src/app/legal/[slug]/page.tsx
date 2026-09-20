import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { getLegalPage, legalPages } from "@/content/legal";
import { profile } from "@/content/portfolio";

type LegalPageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = () => legalPages.map((page) => ({ slug: page.slug }));

export const generateMetadata = async ({ params }: LegalPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const page = getLegalPage(slug);

  if (!page) {
    return { title: "Legal" };
  }

  return {
    title: page.title,
    description: page.intro,
    alternates: { canonical: `/legal/${slug}` },
  };
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

// Section titles carry their own number ("1. Overview"). Split it out so the numeral can be set in gold.
const splitTitle = (title: string, index: number) => {
  const match = title.match(/^(\d+)\.\s*(.*)$/);
  return match ? { number: match[1].padStart(2, "0"), text: match[2] } : { number: String(index + 1).padStart(2, "0"), text: title };
};

export default async function LegalPage({ params }: LegalPageProps) {
  const { slug } = await params;
  const page = getLegalPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      {/* 1. Title. Words only, the gold thread beneath. */}
      <section className="paper pb-10 pt-32 md:pb-14 md:pt-40">
        <div className="container-shell">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-8 max-w-4xl font-display text-4xl font-bold uppercase leading-[1.0] text-balance sm:text-5xl lg:text-[4.5rem]">
            {page.title}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-black/75">{page.intro}</p>
          <hr className="thread mt-14" />
        </div>
      </section>

      {/* 2. The document. Switcher and index stay put on the left, the sections scroll on the right. */}
      <section className="paper pb-20 pt-4 md:pb-28">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <aside>
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow">Documents</p>
              <ul className="mt-5 flex flex-wrap gap-2.5 lg:flex-col lg:gap-0 lg:border-t lg:border-black/15">
                {legalPages.map((doc) => {
                  const active = doc.slug === slug;
                  return (
                    <li className="lg:border-b lg:border-black/15" key={doc.slug}>
                      <Link
                        aria-current={active ? "page" : undefined}
                        className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm transition-colors lg:w-full lg:rounded-none lg:border-0 lg:px-0 lg:py-4 lg:font-display lg:text-xl lg:font-semibold ${
                          active
                            ? "border-black bg-black text-ivory lg:bg-transparent lg:text-black"
                            : "border-black/15 text-black/70 hover:border-black hover:text-black lg:text-black/45 lg:hover:text-black"
                        }`}
                        href={`/legal/${doc.slug}`}
                      >
                        <span
                          aria-hidden="true"
                          className={`hidden h-2 w-2 shrink-0 rounded-full lg:block ${active ? "bg-gold" : "bg-transparent"}`}
                        />
                        {doc.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <nav aria-label="On this page" className="mt-12 hidden lg:block">
                <p className="eyebrow">On this page</p>
                <ol className="mt-5 space-y-2.5">
                  {page.sections.map(([title], index) => {
                    const { number, text } = splitTitle(title, index);
                    return (
                      <li key={title}>
                        <a
                          className="group inline-flex items-baseline gap-3 text-sm text-black/60 transition-colors hover:text-black"
                          href={`#${slugify(title)}`}
                        >
                          <span className="font-display text-xs font-semibold text-gold-shadow">{number}</span>
                          <span className="underline-offset-4 group-hover:underline group-hover:decoration-gold group-hover:decoration-2">
                            {text}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </div>
          </aside>

          <article>
            <ol className="border-t border-black/15">
              {page.sections.map(([title, text], index) => {
                const heading = splitTitle(title, index);
                return (
                  <li className="scroll-mt-32 border-b border-black/15 py-9 md:py-11" id={slugify(title)} key={title}>
                    <div className="grid gap-4 sm:grid-cols-[3.5rem_1fr]">
                      <span className="thread-text font-display text-3xl font-bold leading-none md:text-4xl">{heading.number}</span>
                      <div>
                        <h2 className="font-display text-2xl font-semibold leading-snug md:text-3xl">{heading.text}</h2>
                        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-black/75 whitespace-pre-line">{text}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </article>
        </div>
      </section>

      {/* 3. Close. Where to take a question. */}
      <section className="section-padding bg-dove-tint">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <h2 className="font-display text-3xl font-bold uppercase leading-[1.02] sm:text-4xl lg:text-[3rem]">
            A question about this?
          </h2>
          <div>
            <p className="max-w-xl text-lg leading-relaxed text-black/75">
              Email me at{" "}
              <a className="font-medium text-black underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-shadow" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              . A short message is plenty. The everyday questions are answered on the FAQ page.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ArrowButton href={`mailto:${profile.email}`} variant="dark">
                Email me
              </ArrowButton>
              <ArrowButton href="/faq" variant="gold">
                Read the FAQ
              </ArrowButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
