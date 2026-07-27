import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getWPResources } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Cozy Toolkit | Gentle Resources & Planners",
  description: "A collection of capacity-first planners, energy check-ins, and somatic resources by DK Jonah.",
  alternates: {
    canonical: "/projects",
  },
};

export default async function ProjectsPage() {
  const wpResources = await getWPResources();

  return (
    <section className="bg-[#fffaf2] pt-36 pb-16 sm:pt-40 md:pt-44 lg:pt-48 md:pb-24">
      <div className="container-shell">
        <h1 className="sr-only">Toolkit</h1>
        <ScrollReveal>
          <SectionHeading
            intro="A growing collection of soft tools for real life, real bodies, real brains, and real seasons."
            label="[Toolkit]"
            title="Take what you need"
          />
        </ScrollReveal>
        <div className="grid gap-6">
          {wpResources.map((project, index) => (
            <ScrollReveal delay={index * 0.1} key={project.slug}>
              <Link
                className="group grid gap-6 rounded-2xl border border-[#ded2c1] bg-[#f8f2e8] p-4 transition-colors hover:border-[#201a16] md:grid-cols-[0.9fr_1.1fr] md:p-6"
                href={`/projects/${project.slug}`}
              >
                <div className="relative aspect-[1.5] overflow-hidden rounded-xl bg-[#f1e7d8]">
                  <Image
                    alt={project.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    src={project.image}
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="mb-4 text-sm text-[#9a8f83]">
                      {project.category} · {project.year}{project.readTime ? ` · ${project.readTime}` : ""}
                    </p>
                    <h2 className="font-display text-3xl sm:text-4xl md:text-[40px] lg:text-[40px] xl:text-6xl font-semibold">
                      {project.title}
                    </h2>
                    <p className="mt-5 max-w-2xl text-lg leading-6 text-[#7a7065]">
                      {project.summary}
                    </p>
                    {project.tags && project.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag.slug}
                            className="inline-block rounded bg-[#ded2c1]/40 px-2 py-0.5 text-xs text-[#7a7065]"
                          >
                            #{tag.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="mt-8 text-sm font-medium text-[#b68a3a]">Open Resource</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
