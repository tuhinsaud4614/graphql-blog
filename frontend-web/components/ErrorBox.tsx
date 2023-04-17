import * as React from "react";

import classNames from "classnames";

import Button from "./Button";

const className = {
  root: "flex flex-col rounded-2xl border border-error-content/50",
  header:
    "px-4 py-2.5 border-b border-error-content/50 dark:border-error-content/50",
  title:
    "text-error dark:text-error-dark text-lg font-medium line-clamp-1 text-ellipsis",
  items: "list-item flex-col m-0 space-y-2",
  item: "text-warning dark:text-warning-dark text-sm",
  footer:
    "px-4 py-3 flex items-center justify-end space-x-3 border-t border-error-content/50 dark:border-error-content/50",
};

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

function Component({ errors, onClose, title, classes, onRetry }: Props) {
  return (
    <div className={classNames(className.root, classes?.root)}>
      <header className={classNames(className.header, classes?.header)}>
        <h1 className={classNames(className.title, classes?.title)}>{title}</h1>
      </header>
      <div className="px-4 py-3">
        {Array.isArray(errors) ? (
          <ul className={classNames(className.items, classes?.items)}>
            {errors.map((er) => (
              <li
                key={er}
                className={classNames(className.item, classes?.item)}
              >
                {er}
              </li>
            ))}
          </ul>
        ) : (
          <p className={classNames(className.item, classes?.item)}>{errors}</p>
        )}
      </div>
      {(onClose || onRetry) && (
        <footer className={classNames(className.footer, classes?.footer)}>
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

const ErrorBox = React.memo(
  Component,
  (prev, next) => prev.errors === next.errors,
);
export default ErrorBox;
