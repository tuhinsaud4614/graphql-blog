"use client";

import * as React from "react";

import { Variants, motion, useIsomorphicLayoutEffect } from "framer-motion";

import STYLES from "@/lib/styles";
import { IAnchorOrigin } from "@/lib/types";
import { cn, getPositions } from "@/lib/utils";

import Portal from "./Portal";

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

const className = {
  backdrop: "fixed inset-0",
  root: "fixed bg-base-100 shadow-mui rounded",
  arrow: "fixed block bg-base-100 transform rotate-45 shadow-mui w-3.5 h-3.5",
  container: "relative z-10 w-full h-full bg-base-100 rounded overflow-hidden",
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
  const [anchorRect, setAnchorRect] = React.useState<DOMRect | null>(null);
  const [selfRect, setSelfRect] = React.useState<DOMRect | null>(null);
  const ref = React.useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const handler = () => {
      if (anchorEle) {
        setAnchorRect(anchorEle.getBoundingClientRect());
      }
    };

    handler();
    window.addEventListener("resize", handler);
    window.addEventListener("scroll", handler);

    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("scroll", handler);
    };
  }, [anchorEle]);

  //   useIsomorphicLayoutEffect(() => {
  //     const ele = ref.current;
  //     if (open && ele) {
  //       const rect = ele.getBoundingClientRect();
  //       if (selfRect?.width !== rect.width || selfRect?.height !== rect.height) {
  //         setSelfRect(ele.getBoundingClientRect());
  //       }
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [open, anchorRect]);

  //   React.useEffect(() => {
  //     if (onClose) {
  //       events.on("routeChangeStart", onClose);
  //       return () => {
  //         events.off("routeChangeStart", onClose);
  //       };
  //     }
  //   }, [onClose, events]);

  if (!open) {
    return null;
  }

  const { arrowLeft, arrowTop, selfLeft, selfTop } = getPositions(
    anchorRect,
    selfRect,
    anchorOrigin,
    fraction,
    hideArrow,
  );

  return (
    <Portal>
      {!!onClose && (
        <div
          onClick={onClose}
          className={cn(
            className.backdrop,
            STYLES.zIndex.menuBackdrop,
            classes?.backdrop,
          )}
        />
      )}
      <motion.section
        ref={ref}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className={cn(className.root, STYLES.zIndex.menu, classes?.root)}
        style={{
          left: selfLeft,
          top: selfTop,
        }}
      >
        {!hideArrow && (
          <motion.span
            variants={arrowVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={cn(className.arrow, classes?.arrow)}
            style={{
              left: arrowLeft,
              top: arrowTop,
            }}
          />
        )}
        <div className={cn(className.container, classes?.container)}>
          {children}
        </div>
      </motion.section>
    </Portal>
  );
};
export default Menu;
