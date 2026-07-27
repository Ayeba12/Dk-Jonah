import Image from "next/image";
import Link from "next/link";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getWPResources } from "@/lib/wordpress";

export const ProjectPreview = async () => {
  const wpResources = await getWPResources();
  const previewResources = wpResources.slice(0, 3);

  return (
    <section className="section-padding bg-[#fffaf2]">
      <div className="container-shell">
        <ScrollReveal>
          <SectionHeading
            intro="A growing library of soft, practical resources for reflection, planning, rest, and self-understanding."
            label="[Toolkit]"
            title="Gentle resources for real capacity"
          />
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-3">
          {previewResources.map((project, index) => (
            <ScrollReveal delay={index * 0.1} key={project.slug}>
              <Link className="group block" href={`/projects/${project.slug}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#f1e7d8]">
                  <Image
                    alt={project.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    src={project.image}
                  />
                </div>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <h3 className="font-display text-2xl font-medium leading-tight">
                    {project.title}
                  </h3>
                  <span className="rounded-full border border-[#ded2c1] px-4 py-2 text-sm transition-colors group-hover:border-[#b68a3a] group-hover:text-[#b68a3a]">
                    Open
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={0.3}>
          <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-lg text-[#7a7065]">Need a softer way to begin?</p>
            <ArrowButton href="/projects">Explore the Toolkit</ArrowButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
