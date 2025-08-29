"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const smootherRef = useRef<HTMLDivElement>(null);
  const servicesSectionRef = useRef<HTMLDivElement>(null);
  const servicesTitleRef = useRef<HTMLHeadingElement>(null);
  const servicesSubtitleRef = useRef<HTMLParagraphElement>(null);
  const serviceCardRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const [glow, setGlow] = React.useState({ x: 0, y: 0 });

  useEffect(() => {
    // Add ScrollSmoother and ScrollToPlugin scripts
    const smootherScript = document.createElement("script");
    smootherScript.src = "https://assets.codepen.io/16327/ScrollSmoother.min.js";
    smootherScript.async = true;
    document.body.appendChild(smootherScript);
    const scrollToScript = document.createElement("script");
    scrollToScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js";
    scrollToScript.async = true;
    document.body.appendChild(scrollToScript);
    let smootherInstance: any = null;
    smootherScript.onload = () => {
      // @ts-ignore
      const ScrollSmoother = window.ScrollSmoother;
      if (ScrollSmoother && smootherRef.current) {
        gsap.registerPlugin(ScrollSmoother);
        smootherInstance = ScrollSmoother.create({
          content: smootherRef.current,
          smooth: 1.5,
          effects: true,
        });
      }
    };
    scrollToScript.onload = () => {
      gsap.registerPlugin(window.ScrollToPlugin);
      // Intercept anchor clicks for slow, precise scroll
      document.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        if (target.tagName === "A" && (target as HTMLAnchorElement).hash) {
          const hash = (target as HTMLAnchorElement).hash;
          const el = document.querySelector(hash);
          if (el) {
            e.preventDefault();
            gsap.to(window, {
              duration: 1.2,
              scrollTo: { y: el, offsetY: 0 },
              ease: "power2.inOut",
            });
          }
        }
      }, true);
    };
    return () => {
      document.body.removeChild(smootherScript);
      document.body.removeChild(scrollToScript);
    };
  }, []);

  useEffect(() => {
    // Animate background gradient
    gsap.fromTo(
      ".animate-gradient-move",
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out" }
    );
    // Staggered fade/slide for hero content (including CTA button)
    gsap.from(taglineRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      delay: 0.2,
    });
    if (headlineRef.current) {
      gsap.from(headlineRef.current.querySelectorAll('span'), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        delay: 0.4,
      });
    }
    gsap.from(paragraphRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      delay: 0.8,
    });
    // Animate CTA button with fromTo for visibility
    gsap.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "expo.out", delay: 1.1 }
    );
    gsap.from(footerRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      delay: 1.5,
    });
    // Animate services section on scroll into view
    if (servicesSectionRef.current) {
      gsap.from(servicesTitleRef.current, {
        scrollTrigger: {
          trigger: servicesSectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.from(servicesSubtitleRef.current, {
        scrollTrigger: {
          trigger: servicesSectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.2,
      });
      serviceCardRefs.forEach((ref, i) => {
        gsap.from(ref.current, {
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          delay: 0.2 * i,
        });
      });
    }
  }, []);

  // Cursor glow trail effect for hero
  const glowRef = React.useRef<HTMLDivElement>(null);
  const mousePos = React.useRef({ x: 0, y: 0 }); // Avoid window usage at init
  const idleAnim = React.useRef(0);

  React.useEffect(() => {
    // Set initial position to center of viewport on client
    mousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    function handleMouseMove(e: MouseEvent) {
      mousePos.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener("mousemove", handleMouseMove);

    let lastX = mousePos.current.x;
    let lastY = mousePos.current.y;
    function animateGlow() {
      idleAnim.current += 0.04;
      // Smoothly interpolate position for trailing effect
      lastX += (mousePos.current.x - lastX) * 0.18;
      lastY += (mousePos.current.y - lastY) * 0.18;
      // Idle breathing/wiggle when mouse is still
      const now = Date.now();
      const idle = Math.abs(mousePos.current.x - lastX) < 0.5 && Math.abs(mousePos.current.y - lastY) < 0.5;
      const wiggleX = idle ? lastX + Math.sin(idleAnim.current) * 8 : lastX;
      const wiggleY = idle ? lastY + Math.cos(idleAnim.current) * 8 : lastY;
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(340px circle at ${wiggleX}px ${wiggleY}px, rgba(255,111,60,0.18) 0%, transparent 80%)`;
      }
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={smootherRef} id="smooth-content">
      <div ref={heroRef} className="min-h-screen bg-black text-white font-sans overflow-hidden" style={{ scrollBehavior: "auto", position: "relative" }}>
        <div ref={glowRef} className="absolute inset-0 pointer-events-none z-30" style={{ opacity: 1, transition: "background 0.2s ease-out" }} />
        <div className="relative w-full z-10">
          <div className="w-full bg-black z-20" style={{ minHeight: "600px" }}>
            {/* Animated background: slow gradient + faint grid */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 animate-gradient-move" style={{
                background: "linear-gradient(120deg, #18181b 0%, #232325 100%)",
                opacity: 0.95,
              }} />
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "48px 48px, 48px 48px",
                opacity: 0.5,
                mixBlendMode: "overlay",
              }} />
            </div>

            {/* Faint MNT wordmark behind hero text */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none select-none -z-0">
              <span className="text-[8rem] font-bold text-gray-800 opacity-10 tracking-widest">MNT</span>
            </div>

            <main className="relative z-10 container mx-auto px-6 sm:px-12 lg:px-20 py-44 sm:py-64 bg-black" style={{ borderRadius: "0 0 3rem 3rem" }}>
              <div className="max-w-3xl">
                <div ref={taglineRef} className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6 font-medium">MNT CONSULTING</div>
                <h1 ref={headlineRef} className="text-5xl sm:text-6xl md:text-7xl font-light leading-[1.1]">
                  <span>We design and build</span>
                  <br />
                  <span className="font-bold">refined digital products</span>
                </h1>
                <p ref={paragraphRef} className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl font-normal">
                  From AI automation and CRMs to modern websites and apps — pragmatic engineering with a refined aesthetic and enterprise-grade discipline.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4 justify-center sm:justify-start">
                  <a
                    ref={ctaRef}
                    href="mailto:maximeloustau1212@gmail.com"
                    className="cta-btn"
                  >
                    <span className="cta-btn-inner">Request a consultation</span>
                  </a>
                </div>
              </div>
            </main>
          </div>
        </div>
        <section ref={servicesSectionRef} className="bg-white w-full pt-16 pb-32 relative z-20 flex flex-col items-center justify-center" style={{ borderTopLeftRadius: "3rem", borderTopRightRadius: "3rem", minHeight: "700px" }}>
          {/* Services Section */}
          <div className="container mx-auto px-6 sm:px-12 lg:px-20 w-full">
            <div className="mb-12 text-center max-w-2xl mx-auto">
              <h2 ref={servicesTitleRef} className="text-5xl sm:text-6xl font-bold mb-6 text-black font-sohne">What We Do</h2>
              <p ref={servicesSubtitleRef} className="text-gray-500 text-lg mb-10">
                From CRMs to AI automations, we help companies move fast, stay efficient, and scale online.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-20">
              {/* CRM Systems */}
              <div ref={serviceCardRefs[0]} className="bg-white rounded-2xl p-8 flex flex-col gap-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:border-orange-400 border border-transparent">
                <div className="mb-2">
                  <svg className="h-8 w-8 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5"></path>
                    <path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-black font-sohne">CRM Systems</h3>
                <p className="text-gray-500">Centralize customer data, streamline sales, and save hours every week with tailored CRM solutions.</p>
                <a href="#" className="text-orange-400 font-medium mt-2 hover:underline transition">Learn more &rarr;</a>
              </div>
              {/* Websites */}
              <div ref={serviceCardRefs[1]} className="bg-white rounded-2xl p-8 flex flex-col gap-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:border-orange-400 border border-transparent">
                <div className="mb-2">
                  <svg className="h-8 w-8 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                    <path d="M3 9h18"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-black font-sohne">Websites</h3>
                <p className="text-gray-500">Modern, responsive websites that engage customers and convert visitors into leads.</p>
                <a href="#" className="text-orange-400 font-medium mt-2 hover:underline transition">Learn more &rarr;</a>
              </div>
              {/* Apps */}
              <div ref={serviceCardRefs[2]} className="bg-white rounded-2xl p-8 flex flex-col gap-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:border-orange-400 border border-transparent">
                <div className="mb-2">
                  <svg className="h-8 w-8 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="7" y="2" width="10" height="20" rx="2"></rect>
                    <circle cx="12" cy="18" r="1"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-black font-sohne">Apps</h3>
                <p className="text-gray-500">From idea to launch — scalable apps that bring your business directly into customers’ hands.</p>
                <a href="#" className="text-orange-400 font-medium mt-2 hover:underline transition">Learn more &rarr;</a>
              </div>
              {/* AI Automations */}
              <div ref={serviceCardRefs[3]} className="bg-white rounded-2xl p-8 flex flex-col gap-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:border-orange-400 border border-transparent">
                <div className="mb-2">
                  <svg className="h-8 w-8 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="5" y="7" width="14" height="10" rx="2"></rect>
                    <circle cx="8" cy="12" r="1"></circle>
                    <circle cx="16" cy="12" r="1"></circle>
                    <path d="M12 7V4"></path>
                    <path d="M9 20h6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-black font-sohne">AI Automations</h3>
                <p className="text-gray-500">Automate repetitive tasks, cut costs, and make smarter decisions with custom AI solutions.</p>
                <a href="#" className="text-orange-400 font-medium mt-2 hover:underline transition">Learn more &rarr;</a>
              </div>
            </div>
            {/* CTA Under Section */}
            <div className="text-center mt-10">
              <p className="text-lg text-gray-500 mb-4">Not sure what you need? Let’s talk about your business.</p>
              <a href="mailto:maximeloustau1212@gmail.com" className="cta-btn inline-flex items-center justify-center font-sohne">
                <span className="cta-btn-inner">Schedule a free consultation</span>
              </a>
            </div>
          </div>
        </section>
        {/* Footer with divider and left alignment */}
        <footer ref={footerRef} className="relative z-10 py-8 text-sm text-gray-500 border-t border-white/10 text-left px-6">
          © {new Date().getFullYear()} MNT Consulting
        </footer>
      </div>
    </div>
  );
}
