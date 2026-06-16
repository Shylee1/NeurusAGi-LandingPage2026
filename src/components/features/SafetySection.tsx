import { useScrollReveal } from "@/hooks/useScrollReveal";
import safetyArch from "@/assets/safety-arch.jpg";

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

          {/* Right — architectural containment diagram (pure CSS/SVG) */}
          <div className={`relative hidden lg:flex items-center justify-center transition-all duration-1000 delay-300 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <div className="relative w-[420px] h-[420px] flex items-center justify-center">
              {/* Concentric containment layers */}
              {[380, 300, 220, 140].map((size, i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: size,
                    height: size,
                    border: `1px solid ${PRINCIPLES[i].color}${i === 0 ? "18" : i === 1 ? "25" : i === 2 ? "35" : "55"}`,
                    boxShadow: `0 0 ${30 - i * 6}px ${PRINCIPLES[i].color}${i === 3 ? "33" : "15"}`,
                    animation: `orbit-${(i % 3) + 1} ${20 + i * 8}s linear infinite${i % 2 === 0 ? " reverse" : ""}`,
                  }}
                />
              ))}

              {/* Center core */}
              <div
                className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "radial-gradient(circle, #0ccfb022 0%, #0ccfb005 100%)",
                  border: "1px solid #0ccfb055",
                  boxShadow: "0 0 30px #0ccfb033, inset 0 0 20px #0ccfb011",
                }}
              >
                <div className="w-4 h-4 rounded-full bg-teal-neural" style={{ boxShadow: "0 0 16px #0ccfb0" }} />
              </div>

              {/* Principle labels at each ring */}
              {PRINCIPLES.map((p, i) => {
                const radius = [190, 150, 110, 70][i];
                const angle = -90 + i * 90;
                const rad = (angle * Math.PI) / 180;
                const x = 210 + radius * Math.cos(rad);
                const y = 210 + radius * Math.sin(rad);
                return (
                  <div
                    key={i}
                    className="absolute flex items-center gap-2 pointer-events-none"
                    style={{
                      left: x,
                      top: y,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: p.color, boxShadow: `0 0 6px ${p.color}` }} />
                    <span className="font-mono text-[9px] tracking-widest whitespace-nowrap" style={{ color: `${p.color}99` }}>{p.number}</span>
                  </div>
                );
              })}

              {/* Scan line sweeping */}
              <div
                className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
                style={{ width: 380, height: 380 }}
              >
                <div
                  className="absolute left-0 right-0 h-[1px]"
                  style={{
                    background: "linear-gradient(90deg, transparent, #0ccfb044, transparent)",
                    animation: "scanBeam 6s linear infinite",
                    top: 0,
                  }}
                />
              </div>

              {/* Corner labels */}
              <div className="absolute inset-0 pointer-events-none">
                {PRINCIPLES.map((p, i) => (
                  <div
                    key={i}
                    className="absolute font-mono text-[9px] tracking-widest"
                    style={{
                      color: `${p.color}70`,
                      top: i < 2 ? `${6 + i * 38}%` : `${i === 2 ? 6 : 44}%`,
                      [i % 2 === 0 ? "right" : "left"]: "0%",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span style={{ color: `${p.color}55` }}>// </span>{p.title}
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
