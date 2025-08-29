"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "hero", label: "Home" },
  { id: "promise", label: "Promise" },
  { id: "services", label: "Services" },
  { id: "footer", label: "Contact" },
];

export default function ScrollNavigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateActiveSection = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;

      // Find which section is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.3) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    // Throttled scroll handler
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial update
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Use GSAP for smooth scrolling
      gsap.to(window, {
        duration: 2,
        scrollTo: {
          y: section,
          offsetY: -80,
        },
        ease: "power3.out",
      });
    }
  };

  return (
    <nav 
      ref={navRef}
      className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block"
    >
      <div className="flex flex-col gap-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`group relative flex items-center gap-3 transition-all duration-300 ease-out ${
              activeSection === section.id
                ? "text-orange-400 scale-110"
                : "text-white/60 hover:text-white/80"
            }`}
          >
            {/* Active indicator */}
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-orange-400 scale-125 shadow-lg shadow-orange-400/50"
                  : "bg-white/30 group-hover:bg-white/50"
              }`}
            />
            
            {/* Label */}
            <span
              className={`text-sm font-medium transition-all duration-300 ${
                activeSection === section.id
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              }`}
            >
              {section.label}
            </span>
            
            {/* Hover effect line */}
            <div
              className={`absolute left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-300 transition-all duration-300 ${
                activeSection === section.id
                  ? "w-8"
                  : "group-hover:w-6"
              }`}
            />
          </button>
        ))}
      </div>
    </nav>
  );
}
