"use client";

import * as React from "react";

import { AnimatePresence, type Variants, motion } from "framer-motion";

import Backdrop from "@/components/Backdrop";
import Portal from "@/components/Portal";
import STYLES from "@/lib/styles";
import { cn } from "@/lib/utils";

const Variants: Variants = {
  hidden: {
    x: "-100%",
    y: 0,
  },
  visible: {
    x: 0,
    y: 0,
  },
};

interface Props {
  children?: React.ReactNode;
  visible: boolean;
  onClose?(): void;
  className?: string;
}

export default function MobileView({
  children,
  visible,
  onClose,
  className,
}: Props) {
  return (
    <Portal>
      <AnimatePresence initial={false}>
        {visible && (
          <>
            <Backdrop
              className={cn(STYLES.zIndex.sidebarBackdrop, "cursor-pointer")}
              onClick={onClose}
            />
            <motion.aside
              className={className}
              variants={Variants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
            >
              {children}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
}
