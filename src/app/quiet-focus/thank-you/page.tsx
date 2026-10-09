import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { thankYouContent as content } from "@/content/quiet-focus";

// The thank-you page is set to noindex, as the working document asks.
export const metadata: Metadata = {
  title: "You’re in | Quiet Focus",
  robots: { index: false, follow: false },
};

const PICTURE = "/assets/avenzor/images/quiet-focus-thank-you.webp";
const LOGO = "/assets/avenzor/images/quiet-focus-logo.png";

// One scene: the bench sketch fills the page, the words sit in the open paper on the left,
// as in DK's layout. On small screens the sketch sits beneath the words instead of behind them.
export default function QuietFocusThankYouPage() {
  return (
    <section className="relative isolate min-h-svh overflow-hidden bg-ivory">
      {/* The sketch. On large screens it is the whole background; the open paper on its left holds the words. */}
      <div className="absolute inset-0 hidden lg:block">
        <Image alt="" className="object-cover object-right" fill priority sizes="100vw" src={PICTURE} unoptimized />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/70 to-transparent lg:via-40%" />
      </div>

      <div className="container-shell relative flex min-h-svh flex-col justify-center pb-16 pt-32 md:pt-40 lg:pb-24">
        <div className="max-w-xl">
          <Image alt={content.logoAlt} className="h-auto w-56 md:w-72" height={191} priority src={LOGO} unoptimized width={900} />

          <h1 className="mt-10 font-display text-5xl font-medium leading-[1.02] text-black sm:text-6xl lg:text-[4.5rem]">
            {content.headline}
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-relaxed text-black/80 md:text-xl">{content.body}</p>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-black/80 md:text-xl">{content.closing}</p>

          <p className="mt-10 font-display text-xl font-medium text-black">{content.signature}</p>

          <Link
            className="mt-12 inline-block text-sm text-black/60 underline decoration-black/30 underline-offset-4 transition-colors hover:text-gold-shadow"
            href={content.back.href}
          >
            {content.back.label}
          </Link>
        </div>

        {/* Small screens: the sketch beneath the words, full width, so the picture is still part of the moment. */}
        <div className="relative mt-14 aspect-[3/2] w-full overflow-hidden rounded-2xl lg:hidden">
          <Image alt="" className="object-cover object-right" fill sizes="100vw" src={PICTURE} unoptimized />
        </div>
      </div>
    </section>
  );
}
