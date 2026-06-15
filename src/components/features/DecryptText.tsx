import { useEffect, useRef, useState } from "react";

interface Props {
  text: string;
  className?: string;
  trigger?: boolean;
  speed?: number;
  onDone?: () => void;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*!?><{}[]";

export default function DecryptText({ text, className = "", trigger = true, speed = 40, onDone }: Props) {
  const [display, setDisplay] = useState(() => Array(text.length).fill("_").join(""));
  const revealedRef = useRef(0);
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!trigger) return;
    revealedRef.current = 0;
    setDisplay(Array(text.length).fill("_").join(""));

    const scramble = (iter = 0) => {
      const revealed = revealedRef.current;
      const next = text
        .split("")
        .map((char, i) => {
          if (i < revealed) return char;
          if (char === " ") return " ";
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setDisplay(next);

      if (iter % 3 === 0 && revealedRef.current < text.length) {
        revealedRef.current++;
      }

      if (revealedRef.current < text.length) {
        rafRef.current = setTimeout(() => scramble(iter + 1), speed);
      } else {
        setDisplay(text);
        onDone?.();
      }
    };

    const t = setTimeout(() => scramble(), 200);
    return () => {
      clearTimeout(t);
      if (rafRef.current) clearTimeout(rafRef.current);
    };
  }, [trigger, text, speed]);

  return (
    <span className={`font-mono ${className}`}>
      {display}
    </span>
  );
}
