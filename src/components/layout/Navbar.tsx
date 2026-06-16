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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-void/90 backdrop-blur-2xl border-b border-teal-neural/8"
            : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo only — name is embedded in the image */}
          <a href="#" className="flex items-center group" data-cursor="true">
            <div className="relative w-10 h-10">
              <img
                src="https://cdn-ai.onspace.ai/onspace/project/uploads/VTYhdTdtxks37QntytFFSG/logo1.jpeg"
                alt="NeurusAGi"
                className="w-10 h-10 rounded-full object-cover ring-1 ring-teal-neural/30 group-hover:ring-teal-neural/70 transition-all duration-300"
              />
              <span className="absolute -inset-0.5 rounded-full animate-glow-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-10">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative font-mono text-[11px] text-white/40 hover:text-teal-neural transition-colors duration-300 tracking-[0.22em] uppercase group"
                data-cursor="true"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-teal-neural group-hover:w-full transition-all duration-400" />
              </a>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              data-cursor="true"
              className="hidden lg:inline-flex relative group overflow-hidden px-6 py-2 font-mono text-[11px] tracking-[0.2em] uppercase border border-teal-neural/25 hover:border-teal-neural/70 text-teal-neural/70 hover:text-teal-neural transition-all duration-300"
            >
              <span className="absolute inset-0 bg-teal-neural/0 group-hover:bg-teal-neural/8 transition-colors duration-300" />
              <span className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full bg-teal-neural/60 transition-all duration-500" />
              <span className="relative">Request Access</span>
            </a>

            {/* Hamburger — mobile */}
            <button
              className="lg:hidden relative z-[60] flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span
                className={`block w-[22px] h-[1.5px] bg-teal-neural origin-center transition-all duration-300 ${
                  open ? "rotate-45 translate-y-[6.5px]" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] bg-teal-neural transition-all duration-200 ${
                  open ? "w-0 opacity-0" : "w-[14px]"
                }`}
              />
              <span
                className={`block w-[22px] h-[1.5px] bg-teal-neural origin-center transition-all duration-300 ${
                  open ? "-rotate-45 -translate-y-[6.5px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer — slides in from right, never full-width slab */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-400 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-void/75 backdrop-blur-sm transition-opacity duration-400 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Panel — right-side drawer, max 280px */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-[min(280px,80vw)] flex flex-col bg-obsidian/98 backdrop-blur-2xl border-l border-teal-neural/10 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer top accent */}
          <div className="h-[2px] bg-gradient-to-r from-transparent via-teal-neural/60 to-transparent" />

          <div className="flex flex-col flex-1 px-8 pt-20 pb-10 gap-0">
            {/* Nav links */}
            <nav className="flex flex-col gap-0 border-b border-white/6 pb-8 mb-8">
              {LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 py-4 border-b border-white/4 last:border-b-0"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <span className="w-2 h-[1px] bg-teal-neural/30 group-hover:w-4 group-hover:bg-teal-neural transition-all duration-300" />
                  <span className="font-mono text-xs text-white/40 group-hover:text-teal-neural transition-colors duration-300 tracking-[0.2em] uppercase">
                    {link.label}
                  </span>
                </a>
              ))}
            </nav>

            {/* CTA */}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center py-3 border border-teal-neural/30 text-teal-neural font-mono text-xs tracking-[0.2em] uppercase hover:bg-teal-neural/8 hover:border-teal-neural/60 transition-all duration-300"
            >
              Request Access
            </a>

            {/* Bottom tagline */}
            <div className="mt-auto pt-8 flex items-center gap-2 opacity-30">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-neural" />
              <span className="font-mono text-[10px] text-white/60 tracking-widest uppercase">A quantum leap in intelligence</span>
            </div>
          </div>

          {/* Right edge glow */}
          <div className="absolute left-0 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-teal-neural/20 to-transparent" />
        </div>
      </div>
    </>
  );
}
