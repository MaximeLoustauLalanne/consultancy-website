"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (progressRef.current) {
        gsap.to(progressRef.current, {
          width: `${scrollPercent}%`,
          duration: 0.1,
          ease: "power2.out",
        });
      }
    };

    // Throttled scroll handler for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial progress update
    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div 
      ref={progressRef}
      className="scroll-progress"
      style={{ width: "0%" }}
    />
  );
}
