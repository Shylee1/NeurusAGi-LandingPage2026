import { useEffect, useRef, useState } from "react";

interface Props {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  active?: boolean;
}

export default function GlitchText({ text, className = "", as: Tag = "span", delay = 0, active = true }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [active, delay]);

  if (!visible) return <Tag className={className} style={{ opacity: 0 }}>{text}</Tag>;

  return (
    <Tag className="relative inline-block" data-text={text}>
      <span className={`relative z-10 ${className}`}>{text}</span>
      <span
        className={`absolute inset-0 glitch-layer-1 ${className}`}
        aria-hidden="true"
      >
        {text}
      </span>
      <span
        className={`absolute inset-0 glitch-layer-2 ${className}`}
        aria-hidden="true"
      >
        {text}
      </span>
    </Tag>
  );
}
