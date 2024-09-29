"use client";

import * as React from "react";

import { AnimatePresence, motion } from "framer-motion";

import useLockedBody from "@/hooks/useLockBody";
import useRouteChangeEffect from "@/hooks/useRouteChangeEffect";
import STYLES from "@/lib/styles";
import { cn } from "@/lib/utils";
import { modalContainerVariants } from "@/lib/variants/framer-variants";

import Backdrop from "../Backdrop";
import Portal from "../Portal";

const className = {
  container:
    "fixed top-1/2 left-1/2 max-h-[calc(100vh-32px)] w-[calc(100%-32px)] sm:max-w-[calc(640px-32px)] flex flex-col bg-base-100 shadow-mui rounded-2xl overflow-hidden",
};

interface Props {
  classes?: {
    backdrop?: string;
    container?: string;
  };
  onHide?(): void;
  open: boolean;
  locked?: boolean;
  children?: React.ReactNode;
}

function Modal({
  onHide,
  open = false,
  locked = false,
  classes,
  children,
}: Props) {
  useLockedBody(open && locked);
  useRouteChangeEffect(onHide);

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <Backdrop
            onClick={onHide}
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
            variants={modalContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              className.container,
              STYLES.zIndex.modal,
              classes?.container,
            )}
            transition={{ duration: 0.1 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
export default Modal;
