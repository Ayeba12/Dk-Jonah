import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { getProject, projects } from "@/content/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = () =>
  projects.map((project) => ({ slug: project.slug }));

export const generateMetadata = async ({
  params,
}: ProjectPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Resource" };
  }

  return {
    title: project.title,
    description: project.summary,
  };
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <section className="bg-[#201a16] px-4 pb-20 pt-32 text-white">
        <div className="container-shell">
          <p className="mb-5 text-sm text-white/45">
            [{project.category}] · {project.year}
          </p>
          <h1 className="font-display max-w-5xl text-6xl font-semibold leading-none md:text-8xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-white/62">
            {project.description}
          </p>
        </div>
      </section>
      <section className="bg-[#fffaf2] py-8">
        <div className="container-shell">
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
        </div>
      </section>
      <section className="section-padding bg-[#fffaf2]">
        <div className="container-shell grid gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 text-sm text-[#7a7065]">[Includes]</p>
            <ul className="grid gap-4">
              {project.scope.map((item) => (
                <li className="border-b border-[#ded2c1] pb-4 text-2xl" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-sm text-[#7a7065]">[Gentle Uses]</p>
            <ul className="grid gap-4">
              {project.outcomes.map((item) => (
                <li className="border-b border-[#ded2c1] pb-4 text-2xl" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <ArrowButton href="/projects">Back to Toolkit</ArrowButton>
          </div>
        </div>
      </section>
    </>
  );
}
