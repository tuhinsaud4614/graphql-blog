import { useLockBody, useMediaQuery } from "@hooks";
import classNames from "classnames";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useRouter } from "next/router";
import * as React from "react";
import Backdrop from "./Backdrop";
import Portal from "./Portal";

const className = {
  container:
    "fixed z-[911] top-1/2 left-1/2 max-h-[calc(100vh-32px)] w-[calc(100%-32px)] sm:max-w-[calc(640px-32px)] flex flex-col bg-base-100 dark:bg-base-dark-100 shadow-mui rounded-2xl overflow-hidden",
};

const smallContainerVariants = {
  hidden: {
    y: "-100vh",
    x: "-50%",
    opacity: 0,
  },
  visible: {
    x: "-50%",
    y: "-50%",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    x: "-50%",
    y: "100vh",
    opacity: 0,
  },
};

const containerVariants: Variants = {
  hidden: {
    y: "-50%",
    x: "-50%",
    scale: 1.2,
    opacity: 0,
    transition: { duration: 0.1 },
  },
  visible: {
    y: "-50%",
    x: "-50%",
    opacity: 1,
    scale: 1,
    transition: { duration: 0.1 },
  },
  exit: {
    scale: 1.2,
    opacity: 0,
    transition: { duration: 0.1 },
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
  const matches = useMediaQuery("(min-width: 640px)");
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
              "z-[910]",
              onHide && "cursor-pointer",
              classes?.backdrop
            )}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            variants={matches ? containerVariants : smallContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={classNames(className.container, classes?.container)}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
export default Modal;
