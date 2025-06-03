"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";


const className = {
  root: "flex items-center justify-between px-4 py-2.5 border-b dark:border-base-dark-200 rounded-tl-2xl rounded-tr-2xl",
  btn: "shrink-0 text-error hover:text-error-focus dark:text-error-dark dark:hover:text-error active:scale-95 flex items-center justify-center p-1 rounded-full",
};

interface Props extends React.ComponentPropsWithRef<"header"> {
  classes?: { root?: string; closeBtn?: string };
  onClose?(): void;
}

export default function ModalHeader({
  onClose,
  classes,
  children,
  ...rest
}: Readonly<Props>) {
  return (
    <header
      {...rest}
      className={cn(
        className.root,
        !children && "!justify-end",
        classes?.root,
        rest.className,
      )}
    >
      {children}
      {onClose && (
        <button
          onClick={onClose}
          className={cn(
            className.btn,

            classes?.closeBtn,
          )}
          aria-label="Modal-Close"
        >
          <XIcon size={24} />
        </button>
      )}
    </header>
  );
}
