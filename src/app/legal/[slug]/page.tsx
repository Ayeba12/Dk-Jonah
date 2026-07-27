import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalPage, legalPages } from "@/content/legal";

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

  return (
    <section className="section-padding bg-[#fffaf2] pt-32">
      <div className="container-shell max-w-4xl">
        <p className="mb-5 text-sm text-[#7a7065]">[Legal]</p>
        <h1 className="font-display text-6xl font-semibold leading-none md:text-8xl">
          {page.title}
        </h1>
        <p className="mt-6 text-xl leading-8 text-[#7a7065]">{page.intro}</p>
        <div className="mt-14 grid gap-8">
          {page.sections.map(([title, text]) => (
            <section className="border-t border-[#ded2c1] pt-8" key={title}>
              <h2 className="font-display text-3xl font-medium">{title}</h2>
              <p className="mt-4 text-lg leading-8 text-[#7a7065]">{text}</p>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
