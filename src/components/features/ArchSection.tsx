import { useState, useRef, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import lnnViz from "@/assets/lnn-viz.jpg";
import dataStorage from "@/assets/data-storage.jpg";
import safetyArch from "@/assets/safety-arch.jpg";
import quantumSphere from "@/assets/quantum-sphere.jpg";

const PILLARS = [
  {
    id: "lnn",
    label: "01",
    title: "Living Neural Network",
    abbr: "LNN",
    image: lnnViz,
    color: "#0ccfb0",
    goldAccent: false,
    description:
      "A biological-to-digital translation of every neural function the human brain performs. Not patterns — actual cognitive processes. Logic, intuition, reasoning, chaos-driven ideation — all replicated in code.",
    stats: [
      { value: "39", label: "Novel Cognitive Components" },
      { value: "∞", label: "Adaptive Learning Loops" },
    ],
  },
  {
    id: "pti",
    label: "02",
    title: "Post-Tokenization Intelligence",
    abbr: "PTI",
    image: dataStorage,
    color: "#d4a853",
    goldAccent: true,
    description:
      "The architecture that breaks free from token-based calculation. NeurusAGi doesn't predict the next token — it generates original thought. Revolutionary data compression stores exabytes in megabytes.",
    stats: [
      { value: "EB→MB", label: "Data Compression Ratio" },
      { value: "0", label: "Centralized Server Dependency" },
    ],
  },
  {
    id: "quantum",
    label: "03",
    title: "Quantum-Powered Framework",
    abbr: "QPF",
    image: quantumSphere,
    color: "#1affd8",
    goldAccent: false,
    description:
      "Built on a quantum processing backbone, covering 5 of 9 theoretical pillars of Artificial Superintelligence. Portable, edge-deployable, and independent of fragile internet infrastructure.",
    stats: [
      { value: "5/9", label: "ASi Theoretical Pillars" },
      { value: "Edge", label: "Deployment Ready" },
    ],
  },
];

function PillarScene({ pillar, active }: { pillar: typeof PILLARS[0]; active: boolean }) {
  return (
    <div
      className={`absolute inset-0 transition-all duration-700 ${active ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 pointer-events-none"}`}
    >
      {/* Full-bleed image */}
      <div className="absolute inset-0">
        <img src={pillar.image} alt={pillar.title} className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/80 to-void/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 lg:px-16 max-w-xl">
        <div className="flex items-center gap-3 mb-6">
          <span
            className="font-mono text-xs tracking-widest"
            style={{ color: pillar.color }}
          >
            {pillar.label}
          </span>
          <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(90deg, ${pillar.color}44, transparent)` }} />
          <span
            className="font-mono text-xs tracking-[0.3em] px-3 py-1 border"
            style={{ color: pillar.color, borderColor: `${pillar.color}33` }}
          >
            {pillar.abbr}
          </span>
        </div>

        <h3 className="font-grotesk font-700 text-3xl md:text-4xl text-white leading-tight mb-5">
          {pillar.title}
        </h3>

        <p className="text-white/55 font-grotesk leading-relaxed text-base mb-8">
          {pillar.description}
        </p>

        <div className="flex gap-8">
          {pillar.stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span
                className="font-mono font-700 text-2xl md:text-3xl"
                style={{ color: pillar.color }}
              >
                {stat.value}
              </span>
              <span className="font-mono text-xs text-white/40 tracking-wider mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ArchSection() {
  const [active, setActive] = useState(0);
  const { ref, visible } = useScrollReveal(0.2);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((a) => (a + 1) % PILLARS.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handlePillarClick = (i: number) => {
    setActive(i);
    clearInterval(intervalRef.current);
  };

  return (
    <section
      id="architecture"
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative min-h-screen overflow-hidden flex flex-col"
    >
      <div className="noise-overlay" />

      {/* Section label */}
      <div
        className={`relative z-10 px-8 lg:px-16 pt-24 pb-8 flex items-center gap-4 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="w-8 h-[1px] bg-teal-neural" />
        <span className="font-mono text-xs text-teal-neural/60 tracking-widest uppercase">Core Architecture</span>
      </div>

      {/* Main scene area */}
      <div className="relative flex-1 min-h-[70vh]">
        {PILLARS.map((p, i) => (
          <PillarScene key={p.id} pillar={p} active={i === active} />
        ))}
      </div>

      {/* Selector row at bottom */}
      <div className="relative z-10 border-t border-white/5">
        <div className="grid grid-cols-3">
          {PILLARS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => handlePillarClick(i)}
              data-cursor="true"
              className={`group relative px-6 lg:px-12 py-8 text-left transition-all duration-500 border-r border-white/5 last:border-r-0 overflow-hidden ${
                i === active ? "bg-white/5" : "hover:bg-white/3"
              }`}
            >
              {/* Active indicator line */}
              <div
                className="absolute bottom-0 left-0 h-[2px] transition-all duration-700"
                style={{
                  width: i === active ? "100%" : "0%",
                  background: p.color,
                }}
              />

              {/* Progress fill */}
              {i === active && (
                <div
                  className="absolute bottom-0 left-0 h-[2px] opacity-20"
                  style={{
                    width: "100%",
                    background: p.color,
                    animation: "beam-sweep 5s linear infinite",
                  }}
                />
              )}

              <span className="font-mono text-xs tracking-widest mb-2 block" style={{ color: `${p.color}88` }}>
                {p.label}
              </span>
              <span
                className={`font-grotesk font-600 text-sm md:text-base transition-colors duration-300 ${i === active ? "text-white" : "text-white/40 group-hover:text-white/60"}`}
              >
                {p.abbr}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
