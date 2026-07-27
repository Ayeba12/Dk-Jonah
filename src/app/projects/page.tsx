import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Toolkit",
  description: "Gentle resources by DK Jonah for real capacity, rest, reflection, and support.",
};

export default function ProjectsPage() {
  return (
    <section className="section-padding bg-[#fffaf2] pt-32">
      <div className="container-shell">
        <h1 className="sr-only">Toolkit</h1>
        <SectionHeading
          intro="A growing collection of soft tools for real life, real bodies, real brains, and real seasons."
          label="[Toolkit]"
          title="Take what you need"
        />
        <div className="grid gap-6">
          {projects.map((project) => (
            <Link
              className="group grid gap-6 rounded-2xl border border-[#ded2c1] bg-[#f8f2e8] p-4 transition-colors hover:border-[#201a16] md:grid-cols-[0.9fr_1.1fr] md:p-6"
              href={`/projects/${project.slug}`}
              key={project.slug}
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
                    {project.category} · {project.year}
                  </p>
                  <h2 className="font-display text-4xl font-semibold md:text-6xl">
                    {project.title}
                  </h2>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-[#7a7065]">
                    {project.summary}
                  </p>
                </div>
                <p className="mt-8 text-sm font-medium text-[#b68a3a]">Open Resource</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
