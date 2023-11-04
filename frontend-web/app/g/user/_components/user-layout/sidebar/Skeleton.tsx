"use client";

import useSynchronizeAnimation from "@/hooks/useSynchronizeAnimation";
import { cn } from "@/lib/utils";

const className = {
  root: "flex flex-col space-y-2",
  bar: "animate-pulse bg-neutral/20",
  bar1: "h-5 w-[40%]",
  bar2: "h-[1.125rem] w-[90%]",
  bar3: "h-3.5 w-[70%]",
};

export default function SidebarSkeleton() {
  const rippleRef = useSynchronizeAnimation<HTMLSpanElement>("animate-pulse");
  return (
    <div className={className.root}>
      <span ref={rippleRef} className={cn(className.bar, className.bar1)} />
      <span ref={rippleRef} className={cn(className.bar, className.bar2)} />
      <span ref={rippleRef} className={cn(className.bar, className.bar3)} />
    </div>
  );
}
