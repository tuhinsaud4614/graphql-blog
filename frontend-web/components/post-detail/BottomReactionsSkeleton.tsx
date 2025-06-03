"use client";

import { AlertCircleIcon, RefreshCwIcon } from "lucide-react";

import Button from "../ui/Button";
import Skeleton from "../ui/Skeleton";

interface LoadingSkeletonProps {
  error?: Error;
  retry?: () => void;
  isLoading?: boolean;
}

export default function BottomReactionsSkeleton({ error, retry }: LoadingSkeletonProps) {
  if (error) {
    return (
      <div className="mt-4 flex items-center justify-between">
        <div className="flex w-full items-center justify-center">
          <div className="flex items-center justify-center gap-3 text-center">
            <div className="flex items-center space-x-2 text-error">
              <AlertCircleIcon className="size-5" />
              <span className="text-sm font-medium">
                Failed to load reactions
              </span>
            </div>
            {retry && (
              <Button
                onClick={retry}
                variant="error"
                className="flex items-center space-x-2 px-1.5 py-1 text-xs"
                type="button"
              >
                <RefreshCwIcon className="size-3" />
                <span>Retry</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="flex w-full items-center justify-between">
        {/* Left side - Like and Comment counters */}
        <div className="flex items-center space-x-6">
          {/* Like section */}
          <div className="flex items-center space-x-2">
            <Skeleton className="size-6 rounded" />
            <Skeleton className="h-4 w-3" />
          </div>

          {/* Comment section */}
          <div className="flex items-center space-x-2">
            <Skeleton className="size-6 rounded" />
            <Skeleton className="h-4 w-3" />
          </div>
        </div>

        {/* Right side - Action button */}
        <div className="flex items-center">
          <Skeleton className="size-6 rounded" />
        </div>
      </div>
    </div>
  );
}
