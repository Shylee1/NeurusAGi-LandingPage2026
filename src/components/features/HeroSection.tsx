import { useEffect, useRef, useState } from "react";
import NeuralCanvas from "./NeuralCanvas";
import GlitchText from "./GlitchText";
import DecryptText from "./DecryptText";
import heroBg from "@/assets/hero-bg.jpg";

export default function HeroSection() {
  const [phase, setPhase] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden scanlines"
    >
      {/* Deep space background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-30"
          style={{
            transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -10}px) scale(1.08)`,
            transition: "transform 0.1s ease-out",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-transparent to-void" />
        <div className="absolute inset-0 bg-gradient-radial-void" />
      </div>

      {/* Neural canvas layer */}
      <div className="absolute inset-0 opacity-60">
        <NeuralCanvas nodeCount={100} />
      </div>

      {/* HUD grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[20, 40, 60, 80].map((y) => (
          <div key={y} className="hud-line" style={{ top: `${y}%`, opacity: 0.3 }} />
        ))}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-teal-neural/10 to-transparent" />
      </div>

      {/* Corner brackets */}
      <div className="absolute top-24 left-8 w-12 h-12 border-t-2 border-l-2 border-teal-neural/40" />
      <div className="absolute top-24 right-8 w-12 h-12 border-t-2 border-r-2 border-teal-neural/40" />
      <div className="absolute bottom-16 left-8 w-12 h-12 border-b-2 border-l-2 border-teal-neural/40" />
      <div className="absolute bottom-16 right-8 w-12 h-12 border-b-2 border-r-2 border-teal-neural/40" />

      {/* Scan beam */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-teal-neural/30 to-transparent beam-sweep" />

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col items-center">

        {/* Status indicator */}
        <div
          className={`flex items-center gap-2 mb-10 transition-all duration-700 ${phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="w-2 h-2 rounded-full bg-teal-neural animate-pulse-slow" />
          <span className="font-mono text-xs text-teal-neural/70 tracking-[0.3em] uppercase">
            System Online · Post-Tokenization Intelligence · v1.0
          </span>
          <span className="w-2 h-2 rounded-full bg-gold-primary animate-pulse-slow" />
        </div>

        {/* Main headline */}
        <div
          className={`transition-all duration-1000 delay-300 ${phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <h1 className="text-6xl md:text-8xl lg:text-[110px] font-grotesk font-700 leading-none tracking-tighter mb-4">
            <GlitchText
              text="Neurus"
              className="text-white"
              delay={500}
            />
            <GlitchText
              text="AGi"
              className="text-gradient-gold gold-glow"
              delay={700}
            />
          </h1>
        </div>

        {/* Tagline decrypt */}
        <div
          className={`mt-4 mb-12 transition-all duration-700 delay-500 ${phase >= 2 ? "opacity-100" : "opacity-0"}`}
        >
          <p className="text-xl md:text-2xl text-white/70 font-grotesk font-300 tracking-wide">
            <DecryptText
              text="A quantum leap in intelligence."
              trigger={phase >= 2}
              speed={35}
              className="text-white/80"
            />
          </p>
        </div>

        {/* Sub descriptor */}
        <div
          className={`max-w-2xl transition-all duration-700 delay-700 ${phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="text-base md:text-lg text-white/45 font-grotesk leading-relaxed">
            The world's first portable, quantum-powered AGi — engineered to{" "}
            <span className="text-teal-neural">truly think</span>, not calculate.
            Built on 39 novel cognitive components,{" "}
            <span className="text-gold-primary">Living Neural Networks</span>, and
            revolutionary data compression.
          </p>
        </div>

        {/* CTA row - NO plain buttons, just interactive links with surgical styling */}
        <div
          className={`mt-14 flex flex-wrap items-center justify-center gap-6 transition-all duration-700 delay-1000 ${phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <a
            href="#architecture"
            data-cursor="true"
            className="group relative overflow-hidden"
          >
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

        {/* Scroll indicator */}
        <div className="mt-20 flex flex-col items-center gap-3 opacity-40">
          <span className="font-mono text-xs text-white/50 tracking-widest uppercase">Scroll to Explore</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-teal-neural/60 to-transparent animate-pulse-slow" />
        </div>
      </div>

      {/* Orbital rings around hero */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none hidden xl:block"
        style={{ perspective: "800px" }}
      >
        {[300, 420, 540].map((size, i) => (
          <div
            key={i}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal-neural/10 orbit-ring-${i + 1}`}
            style={{ width: size, height: size }}
          />
        ))}
      </div>

      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-void to-transparent pointer-events-none" />
    </section>
  );
}
