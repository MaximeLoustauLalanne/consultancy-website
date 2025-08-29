"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Promise() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const idleAnim = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (headlineRef.current) {
      const letters = headlineRef.current.querySelectorAll("span");

      // Set initial state - all letters start as light gray
      gsap.set(letters, {
        color: "#9CA3AF", // Light gray
      });

      // Create scroll-triggered reveal effect
      letters.forEach((letter, index) => {
        gsap.to(letter, {
          color: "#FFFFFF", // White
          duration: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: `top ${90 - (index * 1.5)}%`, // Start earlier (90% instead of 80%)
            end: `top ${50 - (index * 1.5)}%`,   // Complete much earlier (50% instead of 20%)
            scrub: true, // Smooth scrubbing effect
            toggleActions: "play none none reverse",
          },
        });
      });
    }

    if (paragraphRef.current) {
      gsap.from(paragraphRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.5,
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top 85%",
        },
      });
    }
  }, []);

  // Cursor glow trail effect - same as Hero section
  useEffect(() => {
    mousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    function handleMouseMove(e: MouseEvent) {
      mousePos.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener("mousemove", handleMouseMove);

    let lastX = mousePos.current.x;
    let lastY = mousePos.current.y;

    function animateGlow() {
      idleAnim.current += 0.04;
      lastX += (mousePos.current.x - lastX) * 0.18;
      lastY += (mousePos.current.y - lastY) * 0.18;

      const idle = Math.abs(mousePos.current.x - lastX) < 0.5 && Math.abs(mousePos.current.y - lastY) < 0.5;
      const wiggleX = idle ? lastX + Math.sin(idleAnim.current) * 8 : lastX;
      const wiggleY = idle ? lastY + Math.cos(idleAnim.current) * 8 : lastY;

      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(340px circle at ${wiggleX}px ${wiggleY}px, rgba(255,111,60,0.18) 0%, transparent 80%)`;
      }
      requestAnimationFrame(animateGlow);
    }

    animateGlow();
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="promise" className="bg-black text-white w-full py-48 relative z-20 flex flex-col items-center justify-center overflow-hidden">
      {/* Cursor glow */}
      <div ref={glowRef} className="absolute inset-0 pointer-events-none z-30" style={{ opacity: 1, transition: "background 0.2s ease-out" }} />
      
      <div className="container mx-auto px-6 sm:px-12 lg:px-20 text-center max-w-5xl relative z-10">
        <h2
          ref={headlineRef}
          className="text-5xl sm:text-6xl font-bold mb-10 tracking-tight leading-snug"
        >
          {"We digitalize your business.".split("").map((char, i) => (
            <span key={i} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>
        <p
          ref={paragraphRef}
          className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto"
        >
          From idea to execution, we turn concepts into polished digital
          products. Whatever your business needs, we deliver.
        </p>
      </div>
    </section>
  );
}
