import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getWPResource, getWPResources } from "@/lib/wordpress";
import { EnergyCheckInTool } from "@/components/tools/EnergyCheckInTool";
import { SoftWeekPlannerTool } from "@/components/tools/SoftWeekPlannerTool";
import { WordsForHelpTool } from "@/components/tools/WordsForHelpTool";
import { RestPromptsTool } from "@/components/tools/RestPromptsTool";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = async () => {
  const wpResources = await getWPResources();
  return wpResources.map((project) => ({ slug: project.slug }));
};

export const generateMetadata = async ({
  params,
}: ProjectPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const project = await getWPResource(slug);

  if (!project) {
    return { title: "Resource" };
  }

  return {
    title: `${project.title} | Tool`,
    description: project.summary,
    alternates: {
      canonical: `/projects/${slug}`,
    },
  };
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getWPResource(slug);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": project.title,
    "description": project.summary,
    "url": `https://dkjonah.com/projects/${slug}`,
    "image": project.image,
    "applicationCategory": "HealthApplication",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "operatingSystem": "All",
    "author": {
      "@type": "Person",
      "name": "DK Jonah",
      "url": "https://dkjonah.com/about",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-[#201a16] px-4 pb-20 pt-36 sm:pt-40 md:pt-44 lg:pt-48 text-white">
        <div className="container-shell">
          <ScrollReveal>
            <p className="mb-5 text-sm text-white/45">
              [{project.category}] · {project.year}{project.readTime ? ` · ${project.readTime}` : ""}
            </p>
            <h1 className="font-display max-w-5xl text-4xl sm:text-5xl md:text-[40px] lg:text-7xl xl:text-8xl font-semibold leading-tight">
              {project.title}
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-white/62">
              {project.description}
            </p>
            {project.tags && project.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag.slug}
                    className="inline-block rounded bg-white/10 px-3 py-1 text-xs text-white/80 transition-colors"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>
      <section className="bg-[#fffaf2] py-8">
        <div className="container-shell">
          <ScrollReveal delay={0.1}>
            <div className="relative aspect-[1.7] overflow-hidden rounded-[28px] bg-[#f1e7d8]">
              <Image
                alt={project.title}
                className="object-cover"
                fill
                priority
                sizes="100vw"
                src={project.image}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
      <section className="section-padding bg-[#fffaf2]">
        <div className="container-shell grid gap-12 md:grid-cols-2">
          <div>
            <ScrollReveal>
              <p className="mb-4 text-sm text-[#7a7065]">[Includes]</p>
              <ul className="grid gap-4">
                {project.scope.map((item) => (
                  <li className="border-b border-[#ded2c1] pb-4 text-2xl" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
          <div>
            <ScrollReveal delay={0.1}>
              <p className="mb-4 text-sm text-[#7a7065]">[Gentle Uses]</p>
              <ul className="grid gap-4">
                {project.outcomes.map((item) => (
                  <li className="border-b border-[#ded2c1] pb-4 text-2xl" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Interactive Tool Section */}
          <div className="md:col-span-2 border-t border-[#ded2c1]/60 pt-12">
            <ScrollReveal>
              <p className="mb-6 text-sm text-[#b68a3a] uppercase font-semibold tracking-wider">[Interactive Practice Tool]</p>
              {project.slug === "energy-check-in" && <EnergyCheckInTool />}
              {project.slug === "soft-week-planner" && <SoftWeekPlannerTool />}
              {project.slug === "words-for-asking-for-help" && <WordsForHelpTool />}
              {project.slug === "rest-without-guilt-prompts" && <RestPromptsTool />}
            </ScrollReveal>
          </div>

          <div className="md:col-span-2 mt-4">
            <ScrollReveal delay={0.2}>
              <ArrowButton href="/projects">Back to Toolkit</ArrowButton>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
