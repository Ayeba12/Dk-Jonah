import { ArrowButton } from "@/components/ui/ArrowButton";

export default function NotFound() {
  return (
    <section className="grid min-h-screen place-items-center bg-[#201a16] px-4 text-center text-white">
      <div>
        <p className="mb-4 text-sm text-white/45">[404]</p>
        <h1 className="font-display text-6xl font-semibold md:text-8xl">
          Page not found
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/62">
          This page is not part of the DK Jonah space.
        </p>
        <div className="mt-8 flex justify-center">
          <ArrowButton href="/" variant="light">
            Back Home
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}
