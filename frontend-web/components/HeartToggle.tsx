"use client";

import * as React from "react";

import { AnimatePresence, motion } from "framer-motion";

import useControllableState from "@/hooks/useControllableState";
import { cn } from "@/lib/utils";

interface Props {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  className?: string;
  classNames?: {
    celebrate?: string;
  };
}

export default function HeartToggle({
  value,
  onValueChange,
  className,
  classNames,
}: Readonly<Props>) {
  const id = React.useId();
  const [isChecked, setIsChecked] = useControllableState({
    onChange: onValueChange,
    prop: value,
    defaultProp: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
  };

  return (
    <div
      className={cn(
        "relative text-current transition-all duration-300",
        className,
      )}
      title="Favorite"
    >
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="absolute inset-0 z-20 size-full cursor-pointer opacity-0"
      />

      <div className="flex size-full items-center justify-center text-current">
        {/* Outline Heart - Always visible */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute size-full fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z" />
        </svg>

        {/* Filled Heart - Shows when checked */}
        <AnimatePresence>
          {isChecked && (
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute size-full fill-current"
              viewBox="0 0 24 24"
              initial={{ scale: 0 }}
              animate={{
                scale: [0, 1.2, 1],
                filter: ["brightness(1)", "brightness(1)", "brightness(1.5)"],
              }}
              transition={{
                duration: 1,
                times: [0, 0.25, 0.5],
              }}
            >
              <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z" />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Celebration Animation - Shows when checked */}
        <AnimatePresence>
          {isChecked && (
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                "absolute block size-full fill-current stroke-current stroke-2",
                classNames?.celebrate,
              )}
              viewBox="0 0 100 100"
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: [0, 1, 1.4],
                opacity: [1, 1, 0],
                filter: "brightness(1.5)",
              }}
              transition={{
                duration: 0.5,
                times: [0, 0.5, 1],
              }}
            >
              <polygon points="10,10 20,20" />
              <polygon points="10,50 20,50" />
              <polygon points="20,80 30,70" />
              <polygon points="90,10 80,20" />
              <polygon points="90,50 80,50" />
              <polygon points="80,80 70,70" />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
