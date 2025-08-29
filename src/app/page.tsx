"use client";

import Hero from "@/components/hero/Hero";
import Services from "@/components/sections/Services";
import Footer from "@/components/ui/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <div>
        <Hero />
        <Services />
        <Footer />
      </div>
    </SmoothScroll>
  );
}
