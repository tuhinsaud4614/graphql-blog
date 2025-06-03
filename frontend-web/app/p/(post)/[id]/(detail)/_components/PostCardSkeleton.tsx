"use client";

import useSynchronizeAnimation from "@/hooks/useSynchronizeAnimation";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export default function PostCardSkeleton({ className }: Readonly<Props>) {
  const rippleRef = useSynchronizeAnimation<HTMLDivElement>("animate-pulse");
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl bg-base-100 shadow-mui dark:bg-base-200",
        className,
      )}
    >
      <div
        ref={rippleRef}
        className="aspect-[2/1] animate-pulse bg-neutral/20"
      />
      <div className="space-y-4 p-4">
        <div
          ref={rippleRef}
          className="h-8 w-3/4 animate-pulse rounded bg-neutral/20"
        />
        <div className="flex items-center gap-3">
          <div
            ref={rippleRef}
            className="size-10 animate-pulse rounded-full bg-neutral/20"
          />
          <div className="flex flex-col gap-2">
            <div
              ref={rippleRef}
              className="h-4 w-24 animate-pulse rounded bg-neutral/20"
            />
            <div
              ref={rippleRef}
              className="h-3 w-32 animate-pulse rounded bg-neutral/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
