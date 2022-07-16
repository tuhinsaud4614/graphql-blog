import { useIsomorphicLayoutEffect } from "@hooks";
import classNames from "classnames";
import { motion, Variants } from "framer-motion";
import * as React from "react";
import { getPositions } from "utils";
import { IAnchorOrigin } from "utils/interfaces";
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
  backdrop: "fixed z-[950] inset-0",
  root: "fixed z-[951] bg-base-100 shadow-mine-2 rounded",
  arrow:
    "fixed block bg-base-100 transform rotate-45 shadow-mine-2 w-3.5 h-3.5",
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

const MenuComponent = ({
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

  React.useEffect(() => {
    if (open && ref.current) {
      setSelfRect(ref.current.getBoundingClientRect());
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const { arrowLeft, arrowTop, selfLeft, selfTop } = getPositions(
    anchorRect,
    selfRect,
    anchorOrigin,
    fraction,
    hideArrow
  );

  return (
    <Portal>
      {!!onClose && (
        <div
          onClick={onClose}
          className={classNames(className.backdrop, classes?.backdrop)}
        />
      )}
      <motion.section
        ref={ref}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className={classNames(className.root, classes?.root)}
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
            className={classNames(className.arrow, classes?.arrow)}
            style={{
              left: arrowLeft,
              top: arrowTop,
            }}
          />
        )}
        <div className={classNames(className.container, classes?.container)}>
          {children}
        </div>
      </motion.section>
    </Portal>
  );
};
// const Menu = React.memo(MenuComponent, (prev, next) => prev.open === next.open);
const Menu = MenuComponent;
export default Menu;
