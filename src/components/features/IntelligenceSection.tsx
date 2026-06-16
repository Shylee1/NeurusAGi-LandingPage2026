import { useRef, useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const COMPARE = [
  {
    side: "left",
    label: "Current AI",
    tag: "LLMs · GPT-5 · Claude · Gemini",
    color: "#ffffff33",
    items: [
      "Predicts next token",
      "Calculates best response",
      "Requires massive server farms",
      "Internet-dependent",
      "Unsustainable energy consumption",
      "Simulates understanding",
      "Function stacking",
      "No true cognition",
    ],
  },
  {
    side: "right",
    label: "NeurusAGi",
    tag: "Post-Tokenization Intelligence",
    color: "#0ccfb0",
    items: [
      "Actually thinks",
      "Generates original reasoning",
      "Runs on edge hardware",
      "Fully portable & offline",
      "Sustainable micro-footprint",
      "True comprehension",
      "39 cognitive components",
      "Real cognition",
    ],
  },
];

function useCountUp(target: number, trigger: boolean, duration = 2000) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const raf = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setVal(Math.floor(ease * target));
      if (t < 1) requestAnimationFrame(raf);
      else setVal(target);
    };
    requestAnimationFrame(raf);
  }, [trigger, target, duration]);
  return val;
}

const METRICS = [
  { value: 39, suffix: "", label: "Novel Cognitive Components" },
  { value: 5, suffix: "/9", label: "ASi Theoretical Pillars Covered" },
  { value: 100, suffix: "%", label: "Portable — No Server Dependency" },
  { value: 0, suffix: "", label: "Self-Awareness (By Design)" },
];

function MetricBubble({ metric, trigger }: { metric: typeof METRICS[0]; trigger: boolean }) {
  const count = useCountUp(metric.value, trigger, 2500);
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center mb-4">
        {/* Animated ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke="#0ccfb011" strokeWidth="2" />
          <circle
            cx="50" cy="50" r="44"
            fill="none"
            stroke={metric.value === 0 ? "#d4a853" : "#0ccfb0"}
            strokeWidth="2"
            strokeDasharray={`${trigger ? (metric.value / (metric.value === 0 ? 1 : metric.value === 5 ? 9 : metric.value === 100 ? 100 : 39)) * 276.5 : 0} 276.5`}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 2.5s ease-out" }}
          />
        </svg>
        <div className="text-center">
          <span className={`font-mono font-700 text-2xl md:text-3xl ${metric.value === 0 ? "text-gold-primary" : "text-teal-neural"}`}>
            {count}{metric.suffix}
          </span>
        </div>
      </div>
      <span className="font-grotesk text-xs text-white/45 max-w-[120px] leading-snug">{metric.label}</span>
    </div>
  );
}

export default function IntelligenceSection() {
  const { ref, visible } = useScrollReveal(0.15);

  return (
    <section
      id="intelligence"
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative min-h-screen py-24 overflow-hidden"
    >
      <div className="noise-overlay" />

      {/* Background: clean gradient depth — no 3D orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 100% 70% at 50% 0%, #071510 0%, #030508 60%)" }} />
        <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(12,207,176,0.006) 3px, rgba(12,207,176,0.006) 4px)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Label */}
        <div className={`flex items-center gap-4 mb-16 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}>
          <div className="w-8 h-[1px] bg-teal-neural" />
          <span className="font-mono text-xs text-teal-neural/60 tracking-widest uppercase">The Difference</span>
        </div>

        {/* Comparison panorama */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0 border border-white/8 overflow-hidden mb-24">
          {/* Left side */}
          <div className={`p-8 lg:p-12 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-xs tracking-widest text-white/30 uppercase">{COMPARE[0].tag}</span>
            </div>
            <h3 className="font-grotesk font-300 text-4xl text-white/30 mb-10 line-through decoration-white/15">
              {COMPARE[0].label}
            </h3>
            <div className="flex flex-col gap-4">
              {COMPARE[0].items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4"
                  style={{ transitionDelay: `${i * 50 + 300}ms` }}
                >
                  <span className="w-3 h-[1px] bg-white/20 shrink-0" />
                  <span className="font-grotesk text-sm text-white/25">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center px-0 lg:px-8 py-8 lg:py-0">
            <div className="hidden lg:block w-[1px] h-full bg-gradient-to-b from-transparent via-teal-neural/30 to-transparent absolute" />
            <div className="w-16 h-16 rounded-full surface-glass flex items-center justify-center z-10 relative">
              <span className="font-mono text-xs text-teal-neural tracking-widest">VS</span>
            </div>
          </div>

          {/* Right side */}
          <div className={`p-8 lg:p-12 bg-teal-neural/[0.03] border-l border-teal-neural/10 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-xs tracking-widest text-teal-neural/60 uppercase">{COMPARE[1].tag}</span>
              <span className="w-2 h-2 rounded-full bg-teal-neural animate-pulse-slow" />
            </div>
            <h3 className="font-grotesk font-700 text-4xl text-gradient-teal teal-glow mb-10">
              {COMPARE[1].label}
            </h3>
            <div className="flex flex-col gap-4">
              {COMPARE[1].items.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-3 h-[1px] bg-teal-neural/60 shrink-0" />
                  <span className="font-grotesk text-sm text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 py-16 border-y border-white/8 transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {METRICS.map((m, i) => (
            <MetricBubble key={i} metric={m} trigger={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
