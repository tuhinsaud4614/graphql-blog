import type { Variants } from "framer-motion";

export const itemInVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 50,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

export const backdropVariants: Variants = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
  },
};

export const modalContainerVariants: Variants = {
  hidden: {
    scale: 1.05,
    opacity: 0,
    x: "-50%",
    y: "-50%",
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    scale: 1.05,
    opacity: 0,
  },
};
