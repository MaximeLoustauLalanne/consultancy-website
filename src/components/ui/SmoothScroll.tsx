"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Register ScrollSmoother plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollSmoother);
}

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Create smooth scroller with slower speed
    smootherRef.current = ScrollSmoother.create({
      wrapper: containerRef.current,
      content: containerRef.current?.querySelector(".smooth-content"),
      smooth: 3, // Slower scrolling (higher = slower)
      effects: false, // Disable effects
      normalizeScroll: true, // Consistent scrolling across devices
      ignoreMobileResize: true, // Better mobile performance
      smoothTouch: 0.1, // Touch device smoothness
    });

    // Cleanup function
    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
      }
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (smootherRef.current) {
        smootherRef.current.refresh();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="smooth-wrapper">
      <div className="smooth-content">
        {children}
      </div>
    </div>
  );
}
