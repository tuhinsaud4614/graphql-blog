"use client";

import { skeletonVariant } from "@/lib/variants/classVariants";

export default function AdminDashboardCardSkeleton() {
  return (
    <div className="rounded-xl bg-secondary/5 p-6 shadow-mui dark:bg-base-200">
      <div className="flex items-center justify-between">
        <div className="flex flex-col justify-center">
          <span
            className={skeletonVariant({
              className: "h-5 w-16",
              shape: "round",
            })}
          />
          <span
            className={skeletonVariant({
              className: "h-7 w-10 mt-2",
              shape: "round",
            })}
          />
        </div>
        <span
          className={skeletonVariant({
            className: "h-8 w-8",
            shape: "circle",
          })}
        />
      </div>
    </div>
  );
}
