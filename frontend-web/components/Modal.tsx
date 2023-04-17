import * as React from "react";

import { useRouter } from "next/router";

import classNames from "classnames";
import { AnimatePresence, Variants, motion } from "framer-motion";

import { useLockBody } from "@/hooks";
import STYLES from "@/utils/styles";

import Backdrop from "./Backdrop";
import Portal from "./Portal";

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
  const { events } = useRouter();

  useLockBody(open && locked);

  React.useEffect(() => {
    if (onHide) {
      events.on("routeChangeStart", onHide);
      return () => {
        events.off("routeChangeStart", onHide);
      };
    }
  }, [onHide, events]);

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <Backdrop
            onClick={onHide}
            className={classNames(
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
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={classNames(
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
