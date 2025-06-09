"use client";

import Skeleton from "@/components/ui/Skeleton";

export default function PostDetailLoading() {
  return (
    <article className="container mx-auto px-4 py-8">
      {/* Title skeleton */}
      <Skeleton className="mb-6 h-12 w-3/4" />

      {/* Author info skeleton */}
      <div className="mb-8 flex items-center gap-4">
        <Skeleton className="size-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      {/* Image skeleton */}
      <Skeleton className="my-8 h-44 w-full rounded-lg lg:h-96" />

      {/* Content skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </article>
  );
}
