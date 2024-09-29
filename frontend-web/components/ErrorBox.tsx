"use client";

import { cn } from "@/lib/utils";

import Sad from "./svg/Sad";
import Button from "./ui/Button";

interface Props {
  title: string;
  errors?: string | string[];
  onClose?(): void;
  onRetry?(): void;
  classes?: {
    root?: string;
    header?: string;
    title?: string;
    items?: string;
    item?: string;
    footer?: string;
  };
}

export default function ErrorBox({
  errors,
  onClose,
  title,
  classes,
  onRetry,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border border-error-content/50",
        classes?.root,
      )}
    >
      <header
        className={cn(
          "border-b border-error-content/50 px-4 py-2.5 dark:border-error-content/50",
          classes?.header,
        )}
      >
        <h1
          className={cn(
            "line-clamp-1 text-ellipsis text-lg font-medium text-error",
            classes?.title,
          )}
        >
          {title}
        </h1>
      </header>
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-center">
          <Sad className="h-auto w-20 text-warning sm:w-[6.25rem]" />
        </div>
        {Array.isArray(errors) ? (
          <ul
            className={cn("m-0 list-item flex-col space-y-2", classes?.items)}
          >
            {errors.map((er) => (
              <li
                key={er}
                className={cn(
                  "text-center text-sm text-warning",
                  classes?.item,
                )}
              >
                {er}
              </li>
            ))}
          </ul>
        ) : (
          <p className={cn("text-center text-sm text-warning", classes?.item)}>
            {errors}
          </p>
        )}
      </div>
      {(onClose || onRetry) && (
        <footer
          className={cn(
            "flex items-center justify-end space-x-3 border-t border-error-content/50 px-4 py-3",
            classes?.footer,
          )}
        >
          {onRetry && (
            <Button
              type="button"
              aria-label="Retry"
              variant="info"
              mode="outline"
              className="text-sm"
              onClick={onRetry}
            >
              Try again
            </Button>
          )}
          {onClose && (
            <Button
              type="button"
              aria-label="Clear errors"
              variant="warning"
              mode="outline"
              className="text-sm"
              onClick={onClose}
            >
              Clear errors
            </Button>
          )}
        </footer>
      )}
    </div>
  );
}
