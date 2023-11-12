"use client";

import useSynchronizeAnimation from "@/hooks/useSynchronizeAnimation";
import { cn } from "@/lib/utils";

const className = {
  root: "overflow-x-auto rounded-2xl bg-base-100 shadow-mui flex flex-col gap-4 p-4",
  common: "bg-base-300 animate-pulse dark:bg-base-200",
};
export default function AdminCategorySkeleton() {
  const rippleRef = useSynchronizeAnimation<HTMLSpanElement>("animate-pulse");
  return (
    <div className={className.root}>
      {Array.from({ length: 4 }, (_, i) => i + 1).map((item) => (
        <div className="flex items-center gap-4" key={item}>
          {Array.from({ length: 4 }, (_, i) => i + 1).map((item2) => (
            <span
              key={item2}
              ref={rippleRef}
              className={cn(className.common, "h-16 flex-1 rounded-lg")}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
