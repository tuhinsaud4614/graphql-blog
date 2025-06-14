"use client";

import { motion } from "framer-motion";

import { Button } from "@/components";
import useMediaQuery from "@/hooks/useMediaQuery";
import STYLES from "@/lib/styles";
import { cn } from "@/lib/utils";

import { useAdminDrawerController } from "../../_context-hooks/useDrawerController";

export default function Hamburger() {
  const matches = useMediaQuery("(min-width: 1280px)");
  const { isOpen, setIsOpen } = useAdminDrawerController();

  if (matches) {
    return null;
  }

  const handleClick = () => {
    setIsOpen?.(!isOpen);
  };

  return (
    <Button
      aria-label="Hamburger"
      type="button"
      mode="outline"
      variant="accent"
      onClick={handleClick}
      className={STYLES.btn.circle}
    >
      <svg
        width="23"
        height="23"
        viewBox="0 0 23 23"
        className={cn(
          "mt-1 flex items-center justify-center",
          isOpen ? "ml-[0.1875rem]" : "ml-[0.0625rem]",
        )}
        aria-hidden="true"
      >
        <motion.path
          fill="transparent"
          strokeWidth="3"
          strokeLinecap="round"
          initial={false}
          animate={{
            d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5",
          }}
          className="stroke-current"
        />

        <motion.path
          fill="transparent"
          strokeWidth="3"
          strokeLinecap="round"
          d="M 2 9.423 L 20 9.423"
          animate={{ opacity: isOpen ? 0 : 1 }}
          initial={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="stroke-current"
        />

        {/* Bottom line */}
        <motion.path
          initial={false}
          fill="transparent"
          strokeWidth="3"
          strokeLinecap="round"
          d="M 2 16.346 L 20 16.346"
          animate={{
            d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346",
          }}
          className="stroke-current"
        />
      </svg>
    </Button>
  );
}
