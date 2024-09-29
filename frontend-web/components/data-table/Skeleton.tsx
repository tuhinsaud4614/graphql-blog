"use client";

import useSynchronizeAnimation from "@/hooks/useSynchronizeAnimation";
import { skeletonVariant } from "@/lib/variants/classVariants";

interface Props {
  rows?: number;
  cols?: number;
}

export default function TableSkeleton({ cols = 4, rows = 4 }: Props) {
  const rippleRef = useSynchronizeAnimation<HTMLSpanElement>("animate-pulse");
  return (
    <div className="flex flex-col gap-4 overflow-x-auto rounded-2xl bg-base-100 shadow-mui dark:border dark:border-base-300">
      <div className="flex items-center gap-4 bg-base-200 p-4">
        {Array.from({ length: cols }, (_, i) => i + 1).map((col) => (
          <span
            key={col}
            ref={rippleRef}
            className={skeletonVariant({
              shape: "round",
              className: "h-7 flex-1",
            })}
          />
        ))}
      </div>
      {Array.from({ length: rows }, (_, i) => i + 1).map((row) => (
        <div className="flex items-center gap-4 px-4" key={row}>
          {Array.from({ length: cols }, (_, i) => i + 1).map((col) => (
            <span
              key={col}
              ref={rippleRef}
              className={skeletonVariant({
                shape: "round",
                className: "h-16 flex-1",
              })}
            />
          ))}
        </div>
      ))}
      <div className="flex items-center gap-4 bg-base-200 p-4 dark:border-base-300">
        {Array.from({ length: cols }, (_, i) => i + 1).map((col) => (
          <span
            key={col}
            ref={rippleRef}
            className={skeletonVariant({
              shape: "round",
              className: "h-7 flex-1",
            })}
          />
        ))}
      </div>
    </div>
  );
}
