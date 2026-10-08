import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** px of rise on entry (ignored under reduced motion) */
  y?: number;
  /** px of forward depth on entry (ignored under reduced motion) */
  z?: number;
  as?: string;
  duration?: number;
  id?: string;
}

/** Scroll-triggered opacity + small translate + very subtle Z lift. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  z = 0,
  as = "div",
  duration = 0.8,
  id,
}: RevealProps) {
  const reduced = useReducedMotion();
  const { ref, revealed } = useRevealOnScroll<HTMLDivElement>();
  const registry = motion as unknown as Record<string, typeof motion.div>;
  const MotionTag = registry[as] ?? motion.div;

  return (
    <MotionTag
      id={id}
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y, z: reduced ? 0 : -z }}
      animate={{
        opacity: revealed ? 1 : 0,
        y: revealed ? 0 : reduced ? 0 : y,
        z: revealed && !reduced && z ? z : 0,
      }}
      transition={{
        duration: reduced ? 0.001 : duration,
        delay: reduced ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={z && !reduced ? { transformStyle: "preserve-3d" } : undefined}
    >
      {children}
    </MotionTag>
  );
}
