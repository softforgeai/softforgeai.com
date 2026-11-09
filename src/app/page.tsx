import type { Metadata } from "next";
import {
  CapabilitiesStrip,
  Hero,
  Process,
  SelectedWork,
  ServicesOverview,
  TechStack,
  WhatWeDo,
  WhyUs,
} from "@/components/sections/home";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilitiesStrip />
      <WhatWeDo />
      <ServicesOverview />
      <WhyUs />
      <SelectedWork />
      <Process />
      <TechStack />
      <FinalCta />
    </>
  );
}
