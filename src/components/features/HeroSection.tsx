import { useEffect, useRef, useState } from "react";
import GlitchText from "./GlitchText";

// ─── Neural fiber particle canvas ───────────────────────────────────────────
function NeuralFiberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0, h = 0;

    // Node type
    interface Node {
      x: number; y: number;
      vx: number; vy: number;
      r: number;
      color: string;
      pulse: number;
      pulseSpeed: number;
    }

    const TEAL = "#0ccfb0";
    const GOLD = "#d4a853";
    const GLOW = "#1affd8";
    const COLORS = [TEAL, TEAL, TEAL, GOLD, GLOW, TEAL];

    let nodes: Node[] = [];

    const init = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;

      const COUNT = Math.min(Math.floor((w * h) / 9000), 140);
      nodes = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.8 + 0.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.012,
      }));
    };

    const MAX_DIST = 160;
    const MAX_DIST_SQ = MAX_DIST * MAX_DIST;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Update nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;
        if (n.x < -10) n.x = w + 10;
        if (n.x > w + 10) n.x = -10;
        if (n.y < -10) n.y = h + 10;
        if (n.y > h + 10) n.y = -10;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq > MAX_DIST_SQ) continue;

          const dist = Math.sqrt(distSq);
          const alpha = (1 - dist / MAX_DIST) * 0.28;

          // Color blend based on which node owns the connection
          const isGold = a.color === GOLD || b.color === GOLD;
          const lineColor = isGold ? GOLD : TEAL;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);

          // Subtle quadratic curve for organic feel
          const mx = (a.x + b.x) / 2 + (Math.sin(a.pulse) * 8);
          const my = (a.y + b.y) / 2 + (Math.cos(b.pulse) * 8);
          ctx.quadraticCurveTo(mx, my, b.x, b.y);

          ctx.strokeStyle = lineColor + Math.floor(alpha * 255).toString(16).padStart(2, "0");
          ctx.lineWidth = 0.6 + alpha * 1.2;
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const glow = 0.6 + 0.4 * Math.sin(n.pulse);
        const radius = n.r * (0.9 + 0.2 * Math.sin(n.pulse * 1.3));

        // Outer glow halo
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, Math.max(radius * 6, 1));
        grad.addColorStop(0, n.color + Math.floor(glow * 90).toString(16).padStart(2, "0"));
        grad.addColorStop(1, n.color + "00");
        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(radius * 6, 0.1), 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(radius, 0.1), 0, Math.PI * 2);
        ctx.fillStyle = n.color + Math.floor(glow * 220).toString(16).padStart(2, "0");
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    draw();

    const onResize = () => init();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.55 }}
    />
  );
}

// ─── Animated scan line ─────────────────────────────────────────────────────
function ScanBeam() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 3 }}
    >
      <div
        className="absolute left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #0ccfb022 20%, #0ccfb066 50%, #0ccfb022 80%, transparent 100%)",
          animation: "scanBeam 10s linear infinite",
          top: 0,
        }}
      />
    </div>
  );
}

// ─── Floating data fragments ─────────────────────────────────────────────────
const DATA_FRAGMENTS = [
  "LNN::INIT", "39 COMPONENTS", "PTI_v1.0", "EDGE::DEPLOY",
  "EB→MB", "QUANTUM//ON", "AGI_SAFE", "NO_SELF_AWARE",
  "CORRIGIBLE", "5/9 PILLARS", "COGNITIVE::LOOP", "THINK::TRUE",
];

function DataFragments() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 4 }}>
      {DATA_FRAGMENTS.map((frag, i) => {
        const top = 8 + (i * 7.2) % 84;
        const left = (i * 11 + 3) % 90;
        const delay = i * 0.4;
        const duration = 6 + (i % 4) * 2;
        return (
          <div
            key={i}
            className="absolute font-mono text-[9px] tracking-widest whitespace-nowrap"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              color: i % 3 === 0 ? "#d4a85333" : "#0ccfb022",
              animation: `dataFloat ${duration}s ease-in-out ${delay}s infinite`,
              opacity: 0,
            }}
          >
            {frag}
          </div>
        );
      })}
    </div>
  );
}

// ─── Magnetic CTA Button ─────────────────────────────────────────────────────
function MagneticCTA({ href, children, variant = "primary" }: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.3;
    const dy = (e.clientY - cy) * 0.3;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleMouseLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = "";
  };

  if (variant === "primary") {
    return (
      <a
        ref={btnRef}
        href={href}
        data-cursor="true"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative overflow-hidden inline-flex items-center gap-3 px-10 py-4 font-mono text-xs tracking-[0.25em] uppercase text-void font-bold bg-teal-neural transition-all duration-200 hover:bg-teal-glow"
        style={{ transition: "background 0.2s, transform 0.15s cubic-bezier(0.23,1,0.32,1)" }}
      >
        <span className="relative z-10">{children}</span>
        {/* Shimmer sweep */}
        <div className="absolute inset-0 translate-x-[-105%] skew-x-[-15deg] group-hover:translate-x-[105%] bg-white/20 transition-transform duration-600 ease-out" />
        {/* Corner accent */}
        <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-void/30" />
        <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-void/30" />
      </a>
    );
  }

  return (
    <a
      ref={btnRef}
      href={href}
      data-cursor="true"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden inline-flex items-center gap-3 px-10 py-4 font-mono text-xs tracking-[0.25em] uppercase text-white/50 hover:text-white border border-white/12 hover:border-white/30 transition-all duration-300"
      style={{ transition: "color 0.3s, border-color 0.3s, transform 0.15s cubic-bezier(0.23,1,0.32,1)" }}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-teal-neural/60 to-transparent transition-all duration-500" />
    </a>
  );
}

// ─── Main Hero ───────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* ── Layer 0: Deep void base ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 110% 80% at 60% 40%, #071510 0%, #040a09 35%, #030508 70%, #020304 100%)",
        }}
      />

      {/* ── Layer 1: Neural fiber canvas ── */}
      <NeuralFiberCanvas />

      {/* ── Layer 2: Depth halos ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {/* Large teal corona — center-left */}
        <div
          className="absolute"
          style={{
            width: "70vw",
            height: "70vw",
            top: "50%",
            left: "35%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, #0ccfb009 0%, #0ccfb004 30%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Gold accent halo — bottom right */}
        <div
          className="absolute"
          style={{
            width: "40vw",
            height: "40vw",
            bottom: "-10%",
            right: "5%",
            background:
              "radial-gradient(circle, #d4a85308 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        {/* Small hot teal spark — top left */}
        <div
          className="absolute w-96 h-96"
          style={{
            top: "5%",
            left: "10%",
            background:
              "radial-gradient(circle, #1affd80a 0%, transparent 60%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      {/* ── Layer 3: Scanlines texture ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(12,207,176,0.008) 3px, rgba(12,207,176,0.008) 4px)",
          zIndex: 3,
        }}
      />

      {/* ── Layer 4: Grain noise ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
          zIndex: 4,
        }}
      />

      {/* ── Layer 5: Floating data fragments ── */}
      <DataFragments />

      {/* ── Layer 6: Scan beam ── */}
      <ScanBeam />

      {/* ── Layer 7: Vignette frame ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 40%, #030508 100%)",
          zIndex: 5,
        }}
      />

      {/* ── Layer 8: HUD corner frames ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 6 }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* TL */}
          <polyline points="2,10 2,2 10,2" fill="none" stroke="#0ccfb0" strokeWidth="0.15" strokeOpacity="0.4" vectorEffect="non-scaling-stroke" />
          {/* TR */}
          <polyline points="90,2 98,2 98,10" fill="none" stroke="#0ccfb0" strokeWidth="0.15" strokeOpacity="0.4" vectorEffect="non-scaling-stroke" />
          {/* BL */}
          <polyline points="2,90 2,98 10,98" fill="none" stroke="#d4a853" strokeWidth="0.15" strokeOpacity="0.3" vectorEffect="non-scaling-stroke" />
          {/* BR */}
          <polyline points="90,98 98,98 98,90" fill="none" stroke="#d4a853" strokeWidth="0.15" strokeOpacity="0.3" vectorEffect="non-scaling-stroke" />
        </svg>
        {/* Top horizontal rule */}
        <div className="absolute top-[8%] left-[6%] right-[6%] h-px" style={{ background: "linear-gradient(90deg, transparent, #0ccfb015, transparent)" }} />
        {/* Bottom horizontal rule */}
        <div className="absolute bottom-[8%] left-[6%] right-[6%] h-px" style={{ background: "linear-gradient(90deg, transparent, #d4a85312, transparent)" }} />
      </div>

      {/* ── MAIN CONTENT ── */}
      <div
        className="relative flex flex-col items-center text-center w-full max-w-6xl mx-auto px-6 select-none"
        style={{ zIndex: 10 }}
      >

        {/* Overline — version tag */}
        <div
          className={`flex items-center gap-4 mb-10 transition-all duration-600 ${
            phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-neural" style={{ boxShadow: "0 0 8px #0ccfb0" }} />
            <span className="font-mono text-[10px] text-teal-neural/50 tracking-[0.35em] uppercase">
              Post-Tokenization · Edge AGi · v1.0
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-primary" style={{ boxShadow: "0 0 8px #d4a853" }} />
          </div>
        </div>

        {/* ── Primary typographic lockup ── */}
        <div
          className={`mb-4 transition-all duration-800 delay-100 ${
            phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* "Neurus" — massive, tracked out */}
          <div className="overflow-hidden">
            <div
              className={`font-grotesk font-bold leading-none text-white transition-all duration-800 delay-150 ${
                phase >= 1 ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
              }`}
              style={{
                fontSize: "clamp(72px, 14vw, 180px)",
                letterSpacing: "-0.03em",
              }}
            >
              <GlitchText text="Neurus" className="text-white" delay={300} />
            </div>
          </div>

          {/* "AGi" — gold gradient, offset right, oversized */}
          <div className="overflow-hidden flex justify-center md:justify-end md:pr-4">
            <div
              className={`font-grotesk font-bold leading-none transition-all duration-800 delay-300 ${
                phase >= 1 ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
              }`}
              style={{
                fontSize: "clamp(72px, 14vw, 180px)",
                letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #d4a853 0%, #f0c040 45%, #ffe082 75%, #d4a853 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "none",
                filter: "drop-shadow(0 0 40px #d4a85355)",
              }}
            >
              <GlitchText text="AGi" delay={500} />
            </div>
          </div>
        </div>

        {/* Divider rule with center diamond */}
        <div
          className={`flex items-center gap-4 w-full max-w-md mb-8 transition-all duration-600 delay-400 ${
            phase >= 2 ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-teal-neural/40" />
          <div
            className="w-2 h-2 rotate-45 border border-teal-neural/60"
            style={{ boxShadow: "0 0 8px #0ccfb055" }}
          />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-teal-neural/40" />
        </div>

        {/* Tagline */}
        <div
          className={`mb-4 transition-all duration-700 delay-400 ${
            phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p
            className="font-grotesk text-white/65 tracking-wide"
            style={{ fontSize: "clamp(14px, 2.2vw, 22px)", fontWeight: 300 }}
          >
            A quantum leap in intelligence.
          </p>
        </div>

        {/* Sub-description */}
        <div
          className={`max-w-xl mb-14 transition-all duration-700 delay-500 ${
            phase >= 2 ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="font-grotesk text-sm md:text-base text-white/35 leading-relaxed">
            The world's first portable AGi — engineered to{" "}
            <span style={{ color: "#0ccfb0" }}>truly think</span>, not calculate.
            {" "}Built on 39 novel cognitive components,{" "}
            <span style={{ color: "#d4a853" }}>Living Neural Networks</span>,
            and revolutionary quantum data compression.
          </p>
        </div>

        {/* CTAs */}
        <div
          className={`flex flex-wrap items-center justify-center gap-4 md:gap-6 transition-all duration-700 delay-700 ${
            phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <MagneticCTA href="#architecture" variant="primary">
            Enter the Mind
          </MagneticCTA>
          <MagneticCTA href="#manifesto" variant="ghost">
            Read the Manifesto
          </MagneticCTA>
        </div>

        {/* Scroll indicator */}
        <div
          className={`mt-20 flex flex-col items-center gap-2 transition-all duration-700 delay-1000 ${
            phase >= 3 ? "opacity-30" : "opacity-0"
          }`}
        >
          <span className="font-mono text-[9px] text-white/50 tracking-[0.3em] uppercase">Scroll</span>
          <div className="relative w-[1px] h-12 overflow-hidden bg-white/10">
            <div
              className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-transparent to-teal-neural"
              style={{ animation: "scrollDrop 2s ease-in-out infinite" }}
            />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #030508 0%, transparent 100%)",
          zIndex: 8,
        }}
      />

      {/* Keyframe injector */}
      <style>{`
        @keyframes scanBeam {
          0%   { top: -2px; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes dataFloat {
          0%   { opacity: 0; transform: translateY(0px); }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { opacity: 0; transform: translateY(-18px); }
        }
        @keyframes scrollDrop {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
