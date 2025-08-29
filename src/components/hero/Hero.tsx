"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const taglineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const idleAnim = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const promiseHeadlineRef = useRef<HTMLHeadingElement>(null);
  const promiseParagraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Hero intro animations
    gsap.from(taglineRef.current, { y: 30, opacity: 0, duration: 0.7, ease: "power2.out", delay: 0.2 });
    if (headlineRef.current) {
      gsap.from(headlineRef.current.querySelectorAll("span"), {
        y: 40, opacity: 0, duration: 0.8, ease: "power2.out", stagger: 0.15, delay: 0.4,
      });
    }
    gsap.from(paragraphRef.current, { y: 30, opacity: 0, duration: 0.7, ease: "power2.out", delay: 0.8 });
    gsap.fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "expo.out", delay: 1.1 });
  }, []);

  // Promise section text reveal effect
  useEffect(() => {
    if (promiseHeadlineRef.current) {
      const letters = promiseHeadlineRef.current.querySelectorAll("span");

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
            trigger: promiseHeadlineRef.current,
            start: `top ${90 - (index * 1.5)}%`, // Start earlier (90% instead of 80%)
            end: `top ${50 - (index * 1.5)}%`,   // Complete much earlier (50% instead of 20%)
            scrub: true, // Smooth scrubbing effect
            toggleActions: "play none none reverse",
          },
        });
      });
    }

    if (promiseParagraphRef.current) {
      gsap.from(promiseParagraphRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.5,
        scrollTrigger: {
          trigger: promiseParagraphRef.current,
          start: "top 85%",
        },
      });
    }
  }, []);

  // Cursor glow effect - simple version
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
    <section id="hero" className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Cursor glow */}
      <div ref={glowRef} className="absolute inset-0 pointer-events-none z-30" style={{ opacity: 1, transition: "background 0.2s ease-out" }} />
      
      {/* Background gradient + grid */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 animate-gradient-move" style={{ background: "linear-gradient(120deg, #18181b 0%, #232325 100%)", opacity: 0.95 }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px, 48px 48px",
          opacity: 0.5,
          mixBlendMode: "overlay",
        }} />
      </div>

      {/* Faint MNT wordmark */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none select-none -z-0">
        <span className="text-[8rem] font-bold text-gray-800 opacity-10 tracking-widest">MNT</span>
      </div>

      {/* Hero content */}
      <main className="relative z-10 container mx-auto px-6 sm:px-12 lg:px-20 py-44 sm:py-64 bg-black rounded-b-[3rem]">
        <div className="max-w-3xl">
          <div ref={taglineRef} className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6 font-medium">MNT CONSULTING</div>
          <h1 ref={headlineRef} className="text-5xl sm:text-6xl md:text-7xl font-light leading-[1.1]">
            <span>We design and build</span><br />
            <span className="font-bold">refined digital products</span>
          </h1>
          <p ref={paragraphRef} className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl font-normal">
            From AI automation and CRMs to modern websites and apps — pragmatic engineering with a refined aesthetic and enterprise-grade discipline.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4 justify-center sm:justify-start">
            <a ref={ctaRef} href="mailto:maximeloustau1212@gmail.com" className="cta-btn">
              <span className="cta-btn-inner">Request a consultation</span>
            </a>
          </div>
        </div>
      </main>

      {/* Trusted By Section */}
      <div className="relative z-20 py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto px-6 sm:px-12 lg:px-20">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4 font-medium">TRUSTED BY</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {/* Marxact */}
            <div className="group cursor-pointer transition-all duration-300 hover:scale-110">
              <div className="w-24 h-24 flex items-center justify-center text-center">
                <span className="text-lg font-normal text-gray-400 group-hover:text-orange-400 transition-colors duration-300 leading-tight">
                  Marxact
                </span>
              </div>
            </div>

            {/* Booking.com */}
            <div className="group cursor-pointer transition-all duration-300 hover:scale-110">
              <div className="w-24 h-24 flex items-center justify-center text-center">
                <span className="text-lg font-normal text-gray-400 group-hover:text-orange-400 transition-colors duration-300 leading-tight">
                  Booking.com
                </span>
              </div>
            </div>

            {/* In The Pocket */}
            <div className="group cursor-pointer transition-all duration-300 hover:scale-110">
              <div className="w-24 h-24 flex items-center justify-center text-center">
                <span className="text-base font-normal text-gray-400 group-hover:text-orange-400 transition-colors duration-300 leading-tight">
                  In The Pocket
                </span>
              </div>
            </div>

            {/* Tiledmedia */}
            <div className="group cursor-pointer transition-all duration-300 hover:scale-110">
              <div className="w-24 h-24 flex items-center justify-center text-center">
                <span className="text-base font-normal text-gray-400 group-hover:text-orange-400 transition-colors duration-300 leading-tight">
                  Tiledmedia
                </span>
              </div>
            </div>

            {/* Nature-sculpt */}
            <div className="group cursor-pointer transition-all duration-300 hover:scale-110">
              <div className="w-24 h-24 flex items-center justify-center text-center">
                <span className="text-base font-normal text-gray-400 group-hover:text-orange-400 transition-colors duration-300 leading-tight">
                  Nature-sculpt
                </span>
              </div>
            </div>

            {/* Rafiziomed */}
            <div className="group cursor-pointer transition-all duration-300 hover:scale-110">
              <div className="w-24 h-24 flex items-center justify-center text-center">
                <span className="text-base font-normal text-gray-400 group-hover:text-orange-400 transition-colors duration-300 leading-tight">
                  Rafiziomed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promise section - merged into Hero */}
      <div className="relative z-20 flex flex-col items-center justify-center py-48">
        <div className="container mx-auto px-6 sm:px-12 lg:px-20 text-center max-w-5xl">
          <h2
            ref={promiseHeadlineRef}
            className="text-5xl sm:text-6xl font-bold mb-10 tracking-tight leading-snug"
          >
            {"We digitalize your business.".split("").map((char, i) => (
              <span key={i} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
          <p
            ref={promiseParagraphRef}
            className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto"
          >
            From idea to execution, we turn concepts into polished digital
            products. Whatever your business needs, we deliver.
          </p>
        </div>
      </div>
    </section>
  );
}
