"use client";

import useSynchronizeAnimation from "@/hooks/useSynchronizeAnimation";

export default function FollowSkeleton() {
  const rippleRef = useSynchronizeAnimation<HTMLSpanElement>("animate-pulse");
  return (
    <div className="flex items-center space-x-2 overflow-hidden">
      {Array.from({ length: 10 }).map((_, index) => (
        <span
          key={index}
          ref={rippleRef}
          className="size-16 shrink-0 animate-pulse rounded-full bg-neutral/20"
        />
      ))}
    </div>
  );
}
