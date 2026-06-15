import { useRef, useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import portabilityImg from "@/assets/portability.jpg";

const CAPABILITIES = [
  {
    id: "cognition",
    headline: "True Cognition",
    sub: "Not Pattern Matching",
    body: "NeurusAGi processes information through 39 cognitive components mirroring actual human brain functions — logic, intuition, reasoning, chaos-driven idea generation — all firing in concert.",
    metric: "39",
    metricLabel: "Cognitive Functions",
    accent: "#0ccfb0",
  },
  {
    id: "research",
    headline: "Autonomous Research",
    sub: "Deep Inquiry Engine",
    body: "Execute deep research tasks independently. Synthesize information across domains, form hypotheses, test logic chains, and deliver conclusions — without a prompt engineer.",
    metric: "Real",
    metricLabel: "Decision Making",
    accent: "#d4a853",
  },
  {
    id: "portability",
    headline: "Edge Portability",
    sub: "No Server Farm Required",
    body: "Runs on compact edge hardware. No cloud dependency, no fragile internet traffic, no $100B server farm. A Gen-6 fighter jet co-pilot that doesn't need to ping a data center.",
    metric: "0",
    metricLabel: "Cloud Dependencies",
    accent: "#1affd8",
  },
  {
    id: "compression",
    headline: "Quantum Compression",
    sub: "Exabytes → Megabytes",
    body: "Proprietary data compression architecture stores exabytes of knowledge in mere megabytes — solving the single largest bottleneck blocking true AGi from existing until now.",
    metric: "EB/MB",
    metricLabel: "Compression Ratio",
    accent: "#d4a853",
  },
  {
    id: "security",
    headline: "Military-Grade Security",
    sub: "EMP-Resistant by Design",
    body: "Decentralized architecture eliminates single points of failure. No fragile centralized internet dependency means no vulnerability to EMP, network disruption, or hostile interference.",
    metric: "∞",
    metricLabel: "Operational Resilience",
    accent: "#0ccfb0",
  },
];

export default function CapabilitiesSection() {
  const { ref, visible } = useScrollReveal(0.1);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartLeft = useRef(0);

  const scrollToIndex = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const item = track.children[i] as HTMLElement;
    if (item) {
      track.scrollTo({ left: item.offsetLeft, behavior: "smooth" });
      setActiveIndex(i);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    scrollStartLeft.current = trackRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    const dx = e.clientX - dragStartX.current;
    trackRef.current.scrollLeft = scrollStartLeft.current - dx;
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <section
      id="capabilities"
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative min-h-screen overflow-hidden py-24"
    >
      <div className="noise-overlay" />
      <div className="absolute inset-0 opacity-15">
        <img src={portabilityImg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-void/90" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6">
          <div className={`flex items-center gap-4 mb-6 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}>
            <div className="w-8 h-[1px] bg-teal-neural" />
            <span className="font-mono text-xs text-teal-neural/60 tracking-widest uppercase">Capabilities</span>
          </div>
          <div className={`flex items-end justify-between mb-12 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="font-grotesk font-700 text-4xl md:text-6xl text-white leading-none">
              What It Can{" "}
              <span className="text-gradient-teal">Actually Do</span>
            </h2>
            <div className="hidden md:flex items-center gap-2 text-white/30 font-mono text-xs">
              <span className="tracking-widest">DRAG TO EXPLORE</span>
              <span className="text-teal-neural">→</span>
            </div>
          </div>
        </div>

        {/* Horizontal scroll track */}
        <div
          ref={trackRef}
          className={`flex overflow-x-auto gap-0 snap-x snap-mandatory scrollbar-hide pl-6 cursor-grab active:cursor-grabbing select-none transition-all duration-700 delay-200 ${visible ? "opacity-100" : "opacity-0"}`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {CAPABILITIES.map((cap, i) => (
            <div
              key={cap.id}
              className="snap-start shrink-0 w-[80vw] md:w-[55vw] lg:w-[40vw] xl:w-[33vw] border-r border-white/8 last:border-r-0 p-8 lg:p-12 relative overflow-hidden group"
              onClick={() => setActiveIndex(i)}
              style={{
                background: i === activeIndex
                  ? `linear-gradient(135deg, ${cap.accent}08, transparent)`
                  : "transparent",
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px] transition-all duration-500"
                style={{
                  background: i === activeIndex
                    ? `linear-gradient(90deg, transparent, ${cap.accent}, transparent)`
                    : "transparent",
                }}
              />

              {/* Index */}
              <span className="font-mono text-xs tracking-widest mb-6 block" style={{ color: `${cap.accent}55` }}>
                {String(i + 1).padStart(2, "0")} / {String(CAPABILITIES.length).padStart(2, "0")}
              </span>

              {/* Metric highlight */}
              <div className="mb-8">
                <span
                  className="font-mono font-700 text-5xl lg:text-6xl leading-none"
                  style={{ color: cap.accent }}
                >
                  {cap.metric}
                </span>
                <span className="font-mono text-xs text-white/30 tracking-widest block mt-1">
                  {cap.metricLabel}
                </span>
              </div>

              <h3 className="font-grotesk font-700 text-2xl text-white mb-1">{cap.headline}</h3>
              <p className="font-mono text-xs tracking-widest text-white/30 mb-6 uppercase">{cap.sub}</p>
              <p className="font-grotesk text-sm text-white/50 leading-relaxed">{cap.body}</p>

              {/* Bottom glow */}
              <div
                className="absolute bottom-0 left-8 right-8 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${cap.accent}44, transparent)` }}
              />
            </div>
          ))}
          {/* Spacer */}
          <div className="shrink-0 w-6" />
        </div>

        {/* Dot navigation */}
        <div className={`flex gap-2 justify-center mt-10 transition-all duration-700 delay-300 ${visible ? "opacity-100" : "opacity-0"}`}>
          {CAPABILITIES.map((cap, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              data-cursor="true"
              className="transition-all duration-300"
              style={{
                width: i === activeIndex ? "24px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === activeIndex ? cap.accent : `${cap.accent}33`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
