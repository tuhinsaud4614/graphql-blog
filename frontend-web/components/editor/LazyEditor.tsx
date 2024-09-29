"use client";

import * as React from "react";

import { RotateCcwIcon } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";

import { cn } from "@/lib/utils";

import type { EditorProps } from ".";
import Button from "../ui/Button";
import Skeleton from "../ui/Skeleton";

const Editor = React.lazy(() => import("."));

interface Props extends EditorProps {
  lazyClassNames?: {
    root?: string;
  };
}

export default function LazyEditor({
  lazyClassNames,
  ...props
}: Readonly<Props>) {
  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }) => {
        return (
          <div
            className={cn(
              "inset-0 flex h-56 items-center justify-center rounded-md border border-input bg-background",
              lazyClassNames?.root,
            )}
          >
            <div className="text-destructive text-center">
              <p>Failed to load Editor. Please try again.</p>
              <Button
                onClick={resetErrorBoundary}
                aria-label="Retry"
                className="mt-2"
                variant="error"
                type="button"
              >
                <RotateCcwIcon className="mr-2 size-4 text-primary-foreground" />
                Retry
              </Button>
            </div>
          </div>
        );
      }}
    >
      <React.Suspense
        fallback={
          <Skeleton className={cn("h-56 rounded-md", lazyClassNames?.root)} />
        }
      >
        <Editor {...props} />
      </React.Suspense>
    </ErrorBoundary>
  );
}
