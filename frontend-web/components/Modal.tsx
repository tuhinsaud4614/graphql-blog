"use client";

import * as React from "react";

import { AnimatePresence, Variants, motion } from "framer-motion";

import useLockedBody from "@/hooks/useLockBody";
import STYLES from "@/lib/styles";
import { cn } from "@/lib/utils";

import { Backdrop, Portal } from "@/components";

const className = {
  container:
    "fixed top-1/2 left-1/2 max-h-[calc(100vh-32px)] w-[calc(100%-32px)] sm:max-w-[calc(640px-32px)] flex flex-col bg-base-100 dark:bg-base-dark-100 shadow-mui rounded-2xl overflow-hidden",
};

const containerVariants: Variants = {
  hidden: {
    scale: 1.05,
    opacity: 0,
    x: "-50%",
    y: "-50%",
    transition: {
      duration: 0.1,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.1,
    },
  },
  exit: {
    scale: 1.05,
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};

interface Props {
  classes?: {
    backdrop?: string;
    container?: string;
  };
  onHide?(): void;
  open: boolean;
  locked?: boolean;
  staticBack?: boolean;
  children?: React.ReactNode;
}

export default function Modal({
  onHide,
  open = true,
  locked = false,
  staticBack = false,
  classes,
  children,
}: Props) {
  useLockedBody(open && locked);
  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <Backdrop
            onClick={staticBack ? undefined : onHide}
            className={cn(
              STYLES.zIndex.backdrop,
              onHide && "cursor-pointer",
              classes?.backdrop,
            )}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={cn(
              className.container,
              STYLES.zIndex.modal,
              classes?.container,
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
