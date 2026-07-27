import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getWPArticles } from "@/lib/wordpress";
import { ArticlesList } from "./ArticlesList";

export const metadata: Metadata = {
  title: "My Cozy Corner",
  description: "Essays and reflections from DK Jonah on invisible realities, faith, rest, and belonging.",
};

export default async function ArticlesPage() {
  const wpArticles = await getWPArticles();

  return (
    <section className="section-padding bg-[#f1e7d8] pt-36 sm:pt-40 md:pt-44 lg:pt-48">
      <div className="container-shell">
        <h1 className="sr-only">My Cozy Corner</h1>
        <ScrollReveal>
          <SectionHeading
            intro="Essays, reflections, and gentle notes for invisible realities, tender faith, neurodivergent rhythms, chronic illness, rest, and belonging."
            label="[My Cozy Corner]"
            title="Essays for the quiet questions you carry"
          />
        </ScrollReveal>
        <ArticlesList articles={wpArticles} />
      </div>
    </section>
  );
}
