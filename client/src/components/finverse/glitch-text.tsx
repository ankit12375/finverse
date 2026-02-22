import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export function GlitchText({ text, className = "", delay = 0, as: Tag = "h1" }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const ref = useRef(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplayText(text);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setIsDecrypting(true);
      let iteration = 0;
      const maxIterations = text.length * 3;

      intervalRef.current = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < iteration / 3) return text[i];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        iteration++;
        if (iteration >= maxIterations) {
          setDisplayText(text);
          setIsDecrypting(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }, 30);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [inView, text, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3, delay: delay / 1000 }}
    >
      <Tag className={`${className} ${isDecrypting ? "neon-text" : ""}`} data-testid="glitch-text">
        {displayText || text.replace(/./g, " ")}
      </Tag>
    </motion.div>
  );
}
