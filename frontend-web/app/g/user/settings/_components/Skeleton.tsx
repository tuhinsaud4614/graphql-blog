"use client";

import { skeletonVariant } from "@/lib/variants/classVariants";

export default function SettingSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex max-w-md flex-1 flex-col justify-center gap-2">
        <span className={skeletonVariant({ className: "w-28 h-6" })} />
        <span className={skeletonVariant({ className: "w-full h-5" })} />
        <span className={skeletonVariant({ className: "w-full h-3" })} />
        <span className={skeletonVariant({ className: "w-full h-3" })} />
      </div>
      <span
        className={skeletonVariant({
          className: "flex self-start shrink-0 h-9 w-14",
        })}
      />
    </div>
  );
}
