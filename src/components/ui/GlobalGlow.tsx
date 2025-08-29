"use client";

import { useEffect, useRef } from "react";

export default function GlobalGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const idleAnim = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });

  // Cursor glow trail effect for the entire website
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
    <div 
      ref={glowRef} 
      className="fixed inset-0 pointer-events-none z-40" 
      style={{ 
        opacity: 1, 
        transition: "background 0.2s ease-out",
        background: "radial-gradient(340px circle at 50% 50%, rgba(255,111,60,0.18) 0%, transparent 80%)"
      }} 
    />
  );
}
