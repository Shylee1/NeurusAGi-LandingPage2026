import { useEffect, useState } from "react";

const LINKS = [
  { label: "Architecture", href: "#architecture" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Safety", href: "#safety" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Manifesto", href: "#manifesto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 bg-void/85 backdrop-blur-xl border-b border-teal-neural/10" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group" data-cursor="true">
          <div className="relative w-9 h-9">
            <img
              src="https://cdn-ai.onspace.ai/onspace/project/uploads/VTYhdTdtxks37QntytFFSG/logo1.jpeg"
              alt="NeurusAGi"
              className="w-9 h-9 rounded-full object-cover ring-1 ring-teal-neural/40 group-hover:ring-teal-neural/80 transition-all duration-300"
            />
            <div className="absolute inset-0 rounded-full animate-pulse-slow bg-teal-neural/10" />
          </div>
          <span className="font-grotesk font-700 text-lg tracking-tight">
            <span className="text-white">Neurus</span>
            <span className="text-gradient-gold">AGi</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-mono text-white/50 hover:text-teal-neural transition-colors duration-300 tracking-widest uppercase"
              data-cursor="true"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#contact"
            data-cursor="true"
            className="relative group overflow-hidden px-6 py-2.5 font-mono text-sm tracking-widest uppercase"
          >
            <span className="absolute inset-0 border border-teal-neural/40 group-hover:border-teal-neural transition-colors duration-300" />
            <span className="absolute inset-0 bg-teal-neural/0 group-hover:bg-teal-neural/10 transition-colors duration-300" />
            <span className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full bg-teal-neural transition-all duration-500" />
            <span className="relative text-teal-neural">Request Access</span>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className={`w-6 h-[1px] bg-teal-neural transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-4 h-[1px] bg-teal-neural transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`w-6 h-[1px] bg-teal-neural transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-void/95 backdrop-blur-xl border-t border-teal-neural/10 px-6 py-8 flex flex-col gap-6">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-white/60 hover:text-teal-neural font-mono text-sm tracking-widest uppercase transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 px-6 py-3 border border-teal-neural/40 text-teal-neural font-mono text-sm tracking-widest uppercase text-center"
          >
            Request Access
          </a>
        </div>
      )}
    </nav>
  );
}
