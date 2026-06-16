import { useEffect, useRef, useState, lazy, Suspense } from "react";
import GlitchText from "./GlitchText";
import DecryptText from "./DecryptText";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));

const getPrefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function HeroSection() {
  const [phase, setPhase] = useState(0);
  const [sceneReady, setSceneReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1100);
    const t3 = setTimeout(() => setPhase(3), 2200);
    const t4 = setTimeout(() => setSceneReady(true), 100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Deep space bg */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, #0a1a16 0%, #030508 70%)" }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(12,207,176,0.012) 2px, rgba(12,207,176,0.012) 4px)",
          zIndex: 2,
        }}
      />

      {/* 3D Quantum Orb Scene */}
      {sceneReady && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 1 }}>
          <div
            className="absolute"
            style={{
              width: isMobile ? "100vw" : "min(90vh, 900px)",
              height: isMobile ? "100vw" : "min(90vh, 900px)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Suspense fallback={null}>
              <HeroScene reducedMotion={getPrefersReducedMotion()} />
            </Suspense>
          </div>
        </div>
      )}

      {/* Radial vignette to blend 3D into background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 55% 55% at 50% 50%, transparent 35%, #030508 100%)",
          zIndex: 3,
        }}
      />

      {/* HUD corners */}
      <div className="absolute top-24 left-8 w-10 h-10 border-t border-l border-teal-neural/30 pointer-events-none" style={{ zIndex: 5 }} />
      <div className="absolute top-24 right-8 w-10 h-10 border-t border-r border-teal-neural/30 pointer-events-none" style={{ zIndex: 5 }} />
      <div className="absolute bottom-16 left-8 w-10 h-10 border-b border-l border-teal-neural/30 pointer-events-none" style={{ zIndex: 5 }} />
      <div className="absolute bottom-16 right-8 w-10 h-10 border-b border-r border-teal-neural/30 pointer-events-none" style={{ zIndex: 5 }} />

      {/* Subtle HUD lines */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 4 }}>
        {[25, 75].map((y) => (
          <div
            key={y}
            className="absolute left-0 right-0 h-px"
            style={{ top: `${y}%`, background: "linear-gradient(90deg, transparent, rgba(12,207,176,0.07), transparent)" }}
          />
        ))}
      </div>

      {/* Main content — above 3D */}
      <div className="relative flex flex-col items-center text-center max-w-5xl mx-auto px-6" style={{ zIndex: 10 }}>

        <div
          className={`flex items-center gap-3 mb-10 transition-all duration-700 ${phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal-neural animate-pulse-slow" />
          <span className="font-mono text-xs text-teal-neural/60 tracking-[0.3em] uppercase">
            System Online · Post-Tokenization Intelligence · v1.0
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold-primary animate-pulse-slow" />
        </div>

        <div
          className={`transition-all duration-1000 delay-200 ${phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <h1 className="text-6xl md:text-8xl lg:text-[106px] font-grotesk font-700 leading-none tracking-tighter mb-4">
            <GlitchText text="Neurus" className="text-white" delay={400} />
            <GlitchText text="AGi" className="text-gradient-gold gold-glow" delay={600} />
          </h1>
        </div>

        <div
          className={`mt-4 mb-12 transition-all duration-700 delay-500 ${phase >= 2 ? "opacity-100" : "opacity-0"}`}
        >
          <p className="text-xl md:text-2xl text-white/70 font-grotesk font-300 tracking-wide">
            <DecryptText text="A quantum leap in intelligence." trigger={phase >= 2} speed={35} className="text-white/80" />
          </p>
        </div>

        <div
          className={`max-w-2xl transition-all duration-700 delay-700 ${phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="text-base md:text-lg text-white/40 font-grotesk leading-relaxed">
            The world's first portable, quantum-powered AGi — engineered to{" "}
            <span className="text-teal-neural">truly think</span>, not calculate.
            Built on 39 novel cognitive components,{" "}
            <span className="text-gold-primary">Living Neural Networks</span>, and
            revolutionary data compression.
          </p>
        </div>

        <div
          className={`mt-14 flex flex-wrap items-center justify-center gap-6 transition-all duration-700 delay-1000 ${phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <a href="#architecture" data-cursor="true" className="group relative overflow-hidden">
            <div className="relative px-10 py-4 font-mono text-sm tracking-widest uppercase text-void font-700 bg-teal-neural hover:bg-teal-glow transition-colors duration-300">
              <span className="relative z-10">Enter the Mind</span>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
            </div>
          </a>
          <a
            href="#manifesto"
            data-cursor="true"
            className="group relative overflow-hidden px-10 py-4 font-mono text-sm tracking-widest uppercase text-white/60 hover:text-white border border-white/15 hover:border-teal-neural/50 transition-all duration-300"
          >
            Read the Manifesto
            <span className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full bg-teal-neural transition-all duration-500" />
          </a>
        </div>

        <div className="mt-20 flex flex-col items-center gap-3 opacity-30">
          <span className="font-mono text-xs text-white/50 tracking-widest uppercase">Scroll to Explore</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-teal-neural/60 to-transparent animate-pulse-slow" />
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, #030508, transparent)", zIndex: 6 }}
      />
    </section>
  );
}
