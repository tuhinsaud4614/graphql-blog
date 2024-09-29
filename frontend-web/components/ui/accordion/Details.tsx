"use client";

import * as React from "react";

import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { useAccordionState } from "./hooks";

export default function AccordionDetails({
  children,
  className,
}: Pick<React.HTMLAttributes<HTMLDivElement>, "children" | "className">) {
  const isExpanded = useAccordionState();

  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.3 }}
          className={cn("overflow-hidden", className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
