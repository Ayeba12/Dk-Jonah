import { AboutPreview } from "@/components/sections/AboutPreview";
import { ArticlesPreview } from "@/components/sections/ArticlesPreview";
import { HomeHero } from "@/components/sections/HomeHero";
import { ProjectPreview } from "@/components/sections/ProjectPreview";
import { RemixCta } from "@/components/sections/RemixCta";
import { ServicesPricingFaq } from "@/components/sections/ServicesPricingFaq";
import { ShowcaseRail } from "@/components/sections/ShowcaseRail";
import { TrustAndTools } from "@/components/sections/TrustAndTools";

export default function Home() {
  return (
    <>
      <HomeHero />
      <AboutPreview />
      <ProjectPreview />
      <ShowcaseRail />
      <TrustAndTools />
      <ServicesPricingFaq />
      <ArticlesPreview />
      <RemixCta />
    </>
  );
}
