import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const LINES = [
  { text: "They built bigger calculators.", color: "text-white/30", size: "text-3xl md:text-5xl" },
  { text: "We built a mind.", color: "text-gradient-teal teal-glow", size: "text-4xl md:text-6xl font-700" },
  { text: "GPT-5. Claude 4. Grok 4.", color: "text-white/20 line-through", size: "text-2xl md:text-4xl" },
  { text: "Advanced calculators.", color: "text-white/25", size: "text-2xl md:text-4xl" },
  { text: "NeurusAGi thinks.", color: "text-gradient-gold gold-glow", size: "text-5xl md:text-7xl font-700" },
  { text: "Truly. Independently. Safely.", color: "text-white/50", size: "text-xl md:text-3xl font-300 tracking-widest" },
];

function ManifestoLine({ text, color, size, index }: { text: string; color: string; size: string; index: number }) {
  const { ref, visible } = useScrollReveal(0.3);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0 blur-none" : "opacity-0 translate-y-10 blur-sm"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <span className={`block font-grotesk leading-tight ${size} ${color}`}>
        {text}
      </span>
    </div>
  );
}

export default function ManifestoSection() {
  const { ref, visible } = useScrollReveal(0.1);
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTicker((t) => t + 1), 80);
    return () => clearInterval(interval);
  }, []);

  const SCROLL_ITEMS = [
    "POST-TOKENIZATION INTELLIGENCE",
    "LIVING NEURAL NETWORK",
    "QUANTUM-POWERED COGNITION",
    "PORTABLE · SUSTAINABLE · SAFE",
    "39 NOVEL COGNITIVE COMPONENTS",
    "EXABYTES IN MEGABYTES",
    "TRUE AGi · NOT A CALCULATOR",
  ];

  return (
    <section
      id="manifesto"
      className="relative py-32 overflow-hidden"
    >
      {/* Background noise texture */}
      <div className="noise-overlay" />

      {/* Gradient accent */}
      <div className="absolute left-0 right-0 top-1/3 h-px bg-gradient-to-r from-transparent via-teal-neural/20 to-transparent" />
      <div className="absolute left-0 right-0 bottom-1/3 h-px bg-gradient-to-r from-transparent via-gold-primary/20 to-transparent" />

      {/* Scrolling ticker */}
      <div className="overflow-hidden border-y border-teal-neural/10 py-4 mb-24">
        <div className="marquee-track flex gap-16 whitespace-nowrap">
          {[...SCROLL_ITEMS, ...SCROLL_ITEMS].map((item, i) => (
            <span
              key={i}
              className="font-mono text-xs tracking-[0.4em] uppercase text-teal-neural/40 flex items-center gap-8"
            >
              {item}
              <span className="w-1 h-1 rounded-full bg-gold-primary/60 inline-block" />
            </span>
          ))}
        </div>
      </div>

      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="max-w-5xl mx-auto px-6 flex flex-col gap-8 text-left"
      >
        {/* Label */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-[1px] bg-teal-neural" />
          <span className="font-mono text-xs text-teal-neural/60 tracking-widest uppercase">Manifesto</span>
        </div>

        {LINES.map((line, i) => (
          <ManifestoLine key={i} {...line} index={i} />
        ))}

        {/* Author tag */}
        <div className="mt-12 flex items-center gap-4 opacity-40">
          <div className="w-12 h-[1px] bg-gold-primary" />
          <span className="font-mono text-sm text-gold-primary tracking-widest">
            Jeremy Taylor · Founder · USMC Veteran · Architect of Post-Tokenization Intelligence
          </span>
        </div>
      </div>

      {/* Bottom ticker reversed */}
      <div className="overflow-hidden border-y border-gold-primary/10 py-4 mt-24">
        <div className="flex gap-16 whitespace-nowrap" style={{ animation: "marquee-left 40s linear infinite reverse" }}>
          {[...SCROLL_ITEMS, ...SCROLL_ITEMS].map((item, i) => (
            <span key={i} className="font-mono text-xs tracking-[0.4em] uppercase text-gold-primary/30 flex items-center gap-8">
              {item}
              <span className="w-1 h-1 rounded-full bg-teal-neural/40 inline-block" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
