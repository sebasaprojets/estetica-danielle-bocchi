import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Marquee } from "@/components/sections/Marquee";
import { Treatments } from "@/components/sections/Treatments";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { Gallery } from "@/components/sections/Gallery";
import { CTA } from "@/components/sections/CTA";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Marquee />
      <Treatments />
      <About />
      <Testimonials />
      <Gallery />
      <CTA />
      <Contact />
    </>
  );
}
