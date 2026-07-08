"use client";

import { useReducedMotion } from "framer-motion";

export function useMotionSafe() {
  const prefersReducedMotion = useReducedMotion();
  return { prefersReducedMotion: !!prefersReducedMotion };
}

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/** Use on wrappers that contain CSS 3D transforms — translateY breaks preserve-3d */
export const fadeInItem = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function getMotionProps(prefersReducedMotion: boolean) {
  if (prefersReducedMotion) {
    return {
      initial: false as const,
      animate: { opacity: 1, y: 0 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-50px" as const },
      transition: { duration: 0 },
    };
  }
  return {
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once: true, margin: "-50px" as const },
  };
}
