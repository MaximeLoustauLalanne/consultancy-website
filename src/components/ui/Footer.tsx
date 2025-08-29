"use client";

export default function Footer() {
  return (
    <footer id="footer" className="relative z-10 py-8 text-sm text-gray-500 border-t border-white/10 text-left px-6">
      © {new Date().getFullYear()} MNT Consulting
    </footer>
  );
}
