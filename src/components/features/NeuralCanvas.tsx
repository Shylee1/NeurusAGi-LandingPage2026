import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
  pulseSpeed: number;
  color: string;
}

interface Props {
  className?: string;
  nodeCount?: number;
  interactive?: boolean;
}

export default function NeuralCanvas({ className = "", nodeCount = 80, interactive = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initNodes();
    };

    const COLORS = ["#0ccfb0", "#0ccfb0", "#d4a853", "#1affd8", "#0a9e88"];

    const initNodes = () => {
      nodesRef.current = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodes = nodesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.pulse += n.pulseSpeed;

        // Mouse repulsion
        if (interactive) {
          const dx = n.x - mx;
          const dy = n.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            n.vx += (dx / dist) * force * 0.5;
            n.vy += (dy / dist) * force * 0.5;
          }
        }

        n.vx *= 0.99;
        n.vy *= 0.99;
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0) n.x = canvas.width;
        if (n.x > canvas.width) n.x = 0;
        if (n.y < 0) n.y = canvas.height;
        if (n.y > canvas.height) n.y = 0;

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 140;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            const grad = ctx.createLinearGradient(n.x, n.y, n2.x, n2.y);
            grad.addColorStop(0, n.color + Math.floor(alpha * 255).toString(16).padStart(2, "0"));
            grad.addColorStop(1, n2.color + Math.floor(alpha * 255).toString(16).padStart(2, "0"));
            ctx.beginPath();
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.6;
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }

        // Draw node
        const glowSize = Math.max(0.5, n.radius + Math.sin(n.pulse) * 1.5);
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowSize * 4);
        grd.addColorStop(0, n.color + "cc");
        grd.addColorStop(0.4, n.color + "44");
        grd.addColorStop(1, n.color + "00");
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowSize * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    if (interactive) canvas.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      if (interactive) canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, [nodeCount, interactive]);

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} />;
}
