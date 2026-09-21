import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { EnergyCheckInTool } from "@/components/tools/EnergyCheckInTool";
import { SoftWeekPlannerTool } from "@/components/tools/SoftWeekPlannerTool";
import { WordsForHelpTool } from "@/components/tools/WordsForHelpTool";
import { RestPromptsTool } from "@/components/tools/RestPromptsTool";
import { MindlessFlowTool } from "@/components/tools/MindlessFlowTool";
import { HawfaCheckInTool } from "@/components/tools/HawfaCheckInTool";
import { DecisionForNowTool } from "@/components/tools/DecisionForNowTool";
import { getTool, tools, toolkitQuietFocusContent } from "@/content/toolkit";

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = async () => tools.map((tool) => ({ slug: tool.slug }));

export const generateMetadata = async ({ params }: ToolPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return { title: "Toolkit" };
  return {
    title: `${tool.title} | Routine Ready Toolkit`,
    description: tool.desc,
    alternates: { canonical: `/toolkit/${slug}` },
  };
};

// Which interface renders for each tool.
const ToolInterface = ({ component }: { component: string }) => {
  switch (component) {
    case "energy":
      return <EnergyCheckInTool />;
    case "mindless":
      return <MindlessFlowTool />;
    case "hawfa":
      return <HawfaCheckInTool />;
    case "decision":
      return <DecisionForNowTool />;
    case "week":
      return <SoftWeekPlannerTool />;
    case "words":
      return <WordsForHelpTool />;
    case "rest":
      return <RestPromptsTool />;
    default:
      return (
        <div className="rounded-2xl bg-dove-tint p-8 md:p-12">
          <p className="font-display text-2xl font-semibold">This tool is being built.</p>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-black/70">
            Join Quiet Focus to hear when it is ready.
          </p>
        </div>
      );
  }
};

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const nextTool = getTool(tool.next);

  return (
    <>
      {/* Tool hero: a black band with the name and its line */}
      <section className="on-black dotted pb-16 pt-32 md:pb-20 md:pt-40">
        <div className="container-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow eyebrow-on-black">{tool.pageLabel ?? "Routine Ready Toolkit"}</p>
            <h1 className="mt-8 font-display text-4xl font-bold uppercase leading-[1.0] text-ivory text-balance sm:text-5xl lg:text-[4rem]">
              {tool.title}
            </h1>
            {tool.label ? (
              <span className="mt-6 inline-block rounded-full border border-gold px-3 py-1 text-xs font-medium text-champagne">
                {tool.label}
              </span>
            ) : null}
          </div>
          <p className="max-w-md text-lg leading-relaxed text-ivory/80 lg:justify-self-end">
            {tool.pageIntro ?? tool.desc}
          </p>
        </div>
      </section>

      {/* The tool itself */}
      <section className="paper section-padding">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.35fr_1fr] lg:gap-16">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-dove-tint lg:sticky lg:top-32">
              <Image alt="" className="object-cover" fill sizes="(min-width: 1024px) 30vw, 100vw" src={tool.image} />
            </div>
          </div>
          <div>
            <ToolInterface component={tool.component} />
            {nextTool ? (
              <div className="mt-10 flex flex-col gap-4 border-t border-black/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-black/60">Next tool</p>
                <Link
                  className="inline-flex items-center gap-2 font-display text-xl font-semibold transition-colors hover:text-gold-shadow"
                  href={`/toolkit/${nextTool.slug}`}
                >
                  {nextTool.title}
                  <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 12h14m0 0-5-5m5 5-5 5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Close, as the Toolkit page's final section */}
      <section className="section-padding bg-dove-tint">
        <div className="container-shell grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow">{toolkitQuietFocusContent.eyebrow}</p>
            <h2 className="mt-8 font-display text-3xl font-bold uppercase leading-[1.02] text-balance sm:text-4xl lg:text-[3.5rem]">
              {toolkitQuietFocusContent.headline}
            </h2>
          </div>
          <div>
            <p className="max-w-xl text-lg leading-relaxed text-black/75">{toolkitQuietFocusContent.body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <ArrowButton href={toolkitQuietFocusContent.cta.href} variant="dark">
                {toolkitQuietFocusContent.cta.label}
              </ArrowButton>
              <Link
                className="text-sm underline decoration-black/30 underline-offset-4 transition-colors hover:text-gold-shadow"
                href="/toolkit#tools"
              >
                All tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
