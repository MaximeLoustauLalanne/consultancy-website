"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: 0.8,
      });
      gsap.from(subtitleRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: 0.2,
      });
      cardRefs.forEach((ref, i) => {
        gsap.from(ref.current, {
          scrollTrigger: { trigger: ref.current, start: "top 90%" },
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: 0.2 * i,
        });
      });
    }
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-white w-full pt-16 pb-32 relative z-20 flex flex-col items-center justify-center rounded-t-[3rem] min-h-[700px]"
    >
      <div className="container mx-auto px-6 sm:px-12 lg:px-20 w-full">
        {/* Section Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2
            ref={titleRef}
            className="text-5xl sm:text-6xl font-bold mb-6 text-black font-sohne"
          >
            Our Expertise
          </h2>
          <p
            ref={subtitleRef}
            className="text-gray-500 text-lg mb-10"
          >
            From CRMs to AI automations, we help companies move fast, stay
            efficient, and scale online.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-20">
          {/* CRM Systems */}
          <div
            ref={cardRefs[0]}
            className="bg-white rounded-2xl p-8 flex flex-col gap-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:border-orange-400 border border-transparent"
          >
            <div className="mb-2">
              <svg
                className="h-8 w-8 text-orange-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                <path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5"></path>
                <path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-black font-sohne">
              CRM Systems
            </h3>
            <p className="text-gray-500">
              Centralize customer data, streamline sales, and save hours every
              week with tailored CRM solutions.
            </p>
            <a
              href="#"
              className="text-orange-400 font-medium mt-2 hover:underline transition"
            >
              Learn more &rarr;
            </a>
          </div>

          {/* Websites */}
          <div
            ref={cardRefs[1]}
            className="bg-white rounded-2xl p-8 flex flex-col gap-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:border-orange-400 border border-transparent"
          >
            <div className="mb-2">
              <svg
                className="h-8 w-8 text-orange-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                <path d="M3 9h18"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-black font-sohne">
              Websites
            </h3>
            <p className="text-gray-500">
              Modern, responsive websites that engage customers and convert
              visitors into leads.
            </p>
            <a
              href="#"
              className="text-orange-400 font-medium mt-2 hover:underline transition"
            >
              Learn more &rarr;
            </a>
          </div>

          {/* Apps */}
          <div
            ref={cardRefs[2]}
            className="bg-white rounded-2xl p-8 flex flex-col gap-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:border-orange-400 border border-transparent"
          >
            <div className="mb-2">
              <svg
                className="h-8 w-8 text-orange-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="7" y="2" width="10" height="20" rx="2"></rect>
                <circle cx="12" cy="18" r="1"></circle>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-black font-sohne">Apps</h3>
            <p className="text-gray-500">
              From idea to launch — scalable apps that bring your business
              directly into customers’ hands.
            </p>
            <a
              href="#"
              className="text-orange-400 font-medium mt-2 hover:underline transition"
            >
              Learn more &rarr;
            </a>
          </div>

          {/* AI Automations */}
          <div
            ref={cardRefs[3]}
            className="bg-white rounded-2xl p-8 flex flex-col gap-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:border-orange-400 border border-transparent"
          >
            <div className="mb-2">
              <svg
                className="h-8 w-8 text-orange-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="5" y="7" width="14" height="10" rx="2"></rect>
                <circle cx="8" cy="12" r="1"></circle>
                <circle cx="16" cy="12" r="1"></circle>
                <path d="M12 7V4"></path>
                <path d="M9 20h6"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-black font-sohne">
              AI Automations
            </h3>
            <p className="text-gray-500">
              Automate repetitive tasks, cut costs, and make smarter decisions
              with custom AI solutions.
            </p>
            <a
              href="#"
              className="text-orange-400 font-medium mt-2 hover:underline transition"
            >
              Learn more &rarr;
            </a>
          </div>
        </div>

        {/* CTA Under Section */}
        <div className="text-center mt-10">
          <p className="text-lg text-gray-500 mb-4">
            Not sure what you need? Let’s talk about your business.
          </p>
          <a
            href="mailto:maximeloustau1212@gmail.com"
            className="cta-btn inline-flex items-center justify-center font-sohne"
          >
            <span className="cta-btn-inner">Schedule a free consultation</span>
          </a>
        </div>
      </div>
    </section>
  );
}
