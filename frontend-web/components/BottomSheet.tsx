import { useMediaQuery } from "@hooks";
import classNames from "classnames";
import { Backdrop, Portal } from "components";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ReactNode } from "react";

const className = {
  containerCommon:
    "fixed z-[911] bg-white shadow-mine-2 overflow-hidden right-0 bottom-0",
  containerNotMatched:
    "h-[calc(100vh-2rem)] w-screen rounded-tl-[1.25rem] rounded-tr-[1.25rem]",
  containerMatched: "w-[25.875rem] h-screen",
};

const notMatchedVariants: Variants = {
  hidden: {
    y: "100%",
    x: 0,
    opacity: 0,
  },
  visible: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
};

const matchedVariants: Variants = {
  hidden: {
    x: "100%",
    y: 0,
    opacity: 0,
  },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
};

interface Props {
  open: boolean;
  onHide?(): void;
  staticBack?: boolean;
  classes?: {
    backdrop?: string;
    container?: string;
  };
  children?: ReactNode;
}

export default function BottomSheet({
  staticBack = false,
  onHide,
  open,
  classes,
  children,
}: Props) {
  const matches = useMediaQuery("(min-width: 768px)");
  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <Backdrop
            onClick={staticBack ? undefined : onHide}
            className={classNames("z-[910]", classes?.backdrop)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            variants={matches ? matchedVariants : notMatchedVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={classNames(
              className.containerCommon,
              classes?.container,
              matches
                ? className.containerMatched
                : className.containerNotMatched
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
