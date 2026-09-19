import type { Metadata } from "next";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { thankYouContent as content } from "@/content/quiet-focus";

// The thank-you page is set to noindex, as the working document asks.
export const metadata: Metadata = {
  title: "You are in | Quiet Focus",
  robots: { index: false, follow: false },
};

export default function QuietFocusThankYouPage() {
  return (
    <>
      <section className="on-black dotted pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="container-shell max-w-4xl">
          <p className="eyebrow eyebrow-on-black">{content.eyebrow}</p>
          <h1 className="mt-8 font-display text-5xl font-bold uppercase leading-[0.98] text-ivory sm:text-6xl lg:text-[5.5rem]">
            {content.headline}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ivory/80">{content.body}</p>
          <p className="mt-6 font-display text-2xl font-semibold text-champagne md:text-3xl">{content.nothingElse}</p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ivory/80">{content.letterLine}</p>
        </div>
      </section>

      <section className="paper section-padding">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase leading-[1.02] sm:text-4xl lg:sticky lg:top-32 lg:text-[3rem]">
              {content.whileHereLabel}
            </h2>
          </div>
          <div>
            <ul className="divide-y divide-black/15 border-y border-black/15">
              {content.whileHere.map((item) => (
                <li className="py-7" key={item.lead}>
                  <p className="text-lg leading-relaxed text-black/75">
                    <strong className="font-semibold text-black">{item.lead}</strong>
                    {item.rest}
                  </p>
                  <div className="mt-4">
                    <ArrowButton href={item.href} size="sm" variant="dark">
                      {item.cta}
                    </ArrowButton>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-black/60">{content.noRush}</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-dove-tint">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase leading-[1.02] sm:text-4xl lg:text-[3rem]">
              {content.questionLabel}
            </h2>
          </div>
          <div>
            <p className="font-display text-2xl font-medium leading-snug md:text-3xl">{content.question}</p>
            <div className="mt-6">
              <ArrowButton href={content.questionCta.href} variant="dark">
                {content.questionCta.label}
              </ArrowButton>
            </div>
            <p className="mt-10 max-w-xl text-sm leading-relaxed text-black/60">{content.closing}</p>
          </div>
        </div>
      </section>
    </>
  );
}
