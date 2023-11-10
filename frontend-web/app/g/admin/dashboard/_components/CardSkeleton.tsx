"use client";

import { skeletonVariant } from "@/lib/variants/classVariants";

export default function AdminDashboardCardSkeleton() {
  return (
    <div className="rounded-xl bg-primary/10 p-6 shadow-mui">
      <div className="flex items-center justify-between">
        <div className="flex flex-col justify-center">
          <span
            className={skeletonVariant({
              className: "h-5 w-16",
              shape: "round",
            })}
          />
          <div className="mt-2 text-2xl font-medium text-secondary">
            <span
              className={skeletonVariant({
                className: "h-7 w-10",
                shape: "round",
              })}
            />
          </div>
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
