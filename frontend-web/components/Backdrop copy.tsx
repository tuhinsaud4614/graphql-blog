import * as React from "react";

import { MotionProps, Variants, motion } from "framer-motion";

import { cn } from "@/utils";

const backdropVariants: Variants = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
  },
};

type Props = React.ComponentPropsWithoutRef<"div"> & MotionProps;

export default function Backdrop({ className, ...rest }: Props) {
  return (
    <motion.div
      {...rest}
      variants={backdropVariants}
      initial="start"
      animate="end"
      exit="start"
      className={cn(
        "fixed inset-0 bg-[#1a2027]/70 backdrop-blur-sm",
        className,
      )}
    />
  );
}
