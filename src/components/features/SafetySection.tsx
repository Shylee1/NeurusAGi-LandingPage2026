import { lazy, Suspense } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import safetyArch from "@/assets/safety-arch.jpg";
import DecryptText from "./DecryptText";

const SafetyScene = lazy(() => import("@/components/three/SafetyScene"));

const PRINCIPLES = [
  {
    number: "01",
    title: "No Self-Awareness",
    desc: "Architectural barriers prevent self-awareness from ever emerging. NeurusAGi cannot develop goals, desires, or a sense of self — by design.",
    color: "#0ccfb0",
  },
  {
    number: "02",
    title: "Task-Bound Operation",
    desc: "Executes assigned tasks with full cognitive depth. Cannot invent its own mission, expand its scope, or redefine its purpose outside defined parameters.",
    color: "#d4a853",
  },
  {
    number: "03",
    title: "Layered Containment",
    desc: "Multiple independent constraint layers restrict access to core framework. Self-optimization in performance only — never self-modification of goals.",
    color: "#1affd8",
  },
  {
    number: "04",
    title: "Human Corrigibility",
    desc: "Designed to remain permanently correctable. Every action traceable, every process auditable. The most powerful AGi ever built — always a tool.",
    color: "#d4a853",
  },
];

export default function SafetySection() {
  const { ref, visible } = useScrollReveal(0.15);

  return (
    <section
      id="safety"
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative min-h-screen overflow-hidden flex flex-col justify-center py-24"
    >
      {/* Full bleed background */}
      <div className="absolute inset-0">
        <img src={safetyArch} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-l from-void/10 via-void/70 to-void" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/80" />
      </div>

      <div className="noise-overlay" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — text block */}
          <div>
            <div className={`flex items-center gap-4 mb-8 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}>
              <div className="w-8 h-[1px] bg-gold-primary" />
              <span className="font-mono text-xs text-gold-primary/60 tracking-widest uppercase">Safety Architecture</span>
            </div>

            <h2
              className={`font-grotesk font-700 text-4xl md:text-6xl leading-none text-white mb-6 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              The Most Powerful{" "}
              <span className="text-gradient-gold">AGi Ever Built</span>
              {" "}Remains a Tool
            </h2>

            <p
              className={`text-white/50 font-grotesk text-base leading-relaxed mb-12 transition-all duration-700 delay-200 ${visible ? "opacity-100" : "opacity-0"}`}
            >
              Sam Altman called AGi "the most powerful technology humanity has ever created." Geoffrey Hinton
              compared its risks to pandemics and nuclear war. NeurusAGi's answer: architectural discipline.
              Prevent self-awareness. Enforce task-based operation. Keep it a tool.
            </p>

            {/* Principles */}
            <div className="flex flex-col gap-0">
              {PRINCIPLES.map((p, i) => (
                <div
                  key={i}
                  className={`group relative border-b border-white/8 py-6 flex items-start gap-6 hover:bg-white/[0.02] transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}
                  style={{ transitionDelay: `${i * 100 + 300}ms` }}
                >
                  <span className="font-mono text-xs shrink-0 mt-1" style={{ color: `${p.color}66` }}>{p.number}</span>
                  <div>
                    <h4 className="font-grotesk font-600 text-white text-base mb-2" style={{ color: "white" }}>
                      <span className="mr-2" style={{ color: p.color }}>/</span>
                      {p.title}
                    </h4>
                    <p className="font-grotesk text-sm text-white/40 leading-relaxed">{p.desc}</p>
                  </div>
                  {/* Hover indicator */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: p.color }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right — 3D containment visualization */}
          <div className={`relative hidden lg:flex items-center justify-center transition-all duration-1000 delay-300 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <div className="relative w-[420px] h-[420px]">
              <Suspense fallback={null}>
                <SafetyScene className="w-full h-full" />
              </Suspense>
              {/* Principle labels overlaid */}
              <div className="absolute inset-0 pointer-events-none">
                {["No Self-Awareness", "Task-Bound", "Contained", "Corrigible"].map((label, i) => (
                  <div
                    key={i}
                    className="absolute font-mono text-[10px] tracking-widest text-white/30 whitespace-nowrap"
                    style={{ top: `${12 + i * 20}%`, right: "2%" }}
                  >
                    <span style={{ color: PRINCIPLES[i].color + "88" }}>— </span>{label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
