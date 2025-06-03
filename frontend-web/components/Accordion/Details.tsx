"use client";

import * as React from "react";

import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { useAccordionStore } from "./context";

export default function Details({
  children,
  className,
}: Readonly<
  Pick<React.HTMLAttributes<HTMLDivElement>, "children" | "className">
>) {
  const [expanded] = useAccordionStore((state) => state.expand);

  return (
    <AnimatePresence initial={false}>
      {expanded && (
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
