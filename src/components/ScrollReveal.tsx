import React from "react";
import { motion } from "motion/react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  className?: string;
  key?: React.Key;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  duration = 0.8,
  className = ""
}: ScrollRevealProps) {
  const directionOffset = {
    up: { y: 25, x: 0 },
    down: { y: -25, x: 0 },
    left: { x: 25, y: 0 },
    right: { x: -25, y: 0 },
    none: { x: 0, y: 0 }
  };

  const initialVal = {
    opacity: 0,
    ...directionOffset[direction]
  };

  return (
    <motion.div
      initial={initialVal}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.215, 0.61, 0.355, 1] // A premium, elegant, smooth ease-out curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
