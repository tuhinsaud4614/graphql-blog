"use client";

import * as React from "react";

import { usePathname, useSearchParams } from "next/navigation";

import { AnimatePresence, Variants, motion } from "framer-motion";

import usePopup from "@/hooks/usePopup";
import STYLES from "@/lib/styles";
import { IAnchorOrigin } from "@/lib/types";
import { cn } from "@/lib/utils";

import Portal from "../Portal";

const variants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
};

const arrowVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
};

interface Props {
  open: boolean;
  anchorEle?: null | Element;
  children?: React.ReactNode;
  onClose?(): void;
  anchorOrigin?: IAnchorOrigin;
  hideArrow?: boolean;
  fraction?: boolean | number;
  classes?: {
    backdrop?: string;
    root?: string;
    arrow?: string;
    container?: string;
  };
}

const Menu = ({
  open = false,
  anchorEle,
  onClose,
  anchorOrigin = { horizontal: "right", vertical: "bottom" },
  hideArrow = false,
  classes,
  fraction,
  children,
}: Props) => {
  // For unknown function pass as dependency for unnecessary re-render
  const closeHandler = React.useRef(onClose);
  const { arrowLeft, arrowTop, popupRef, popupLeft, popupTop } =
    usePopup<HTMLDivElement>({
      anchorOrigin,
      open,
      anchorEle,
      fraction,
      hideArrow,
    });

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const url = `${pathname}?${searchParams}`;

  React.useEffect(() => {
    closeHandler.current?.();
  }, [url]);

  return (
    <Portal>
      {open && !!onClose && (
        <div
          onClick={onClose}
          className={cn(
            "fixed inset-0",
            STYLES.zIndex.menuBackdrop,
            classes?.backdrop,
          )}
        />
      )}
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            ref={popupRef}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={cn(
              "fixed rounded bg-base-100 shadow-mui dark:bg-base-200",
              STYLES.zIndex.menu,
              classes?.root,
            )}
            style={{
              left: popupLeft,
              top: popupTop,
            }}
          >
            {!hideArrow && (
              <motion.span
                variants={arrowVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={cn(
                  "fixed block h-3.5 w-3.5 rotate-45 bg-base-100 shadow-mui dark:bg-base-200",
                  classes?.arrow,
                )}
                style={{
                  left: arrowLeft,
                  top: arrowTop,
                }}
              />
            )}
            <div
              className={cn(
                "relative z-10 h-full w-full overflow-hidden rounded bg-base-100 dark:bg-base-200",
                classes?.container,
              )}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};
export default Menu;
