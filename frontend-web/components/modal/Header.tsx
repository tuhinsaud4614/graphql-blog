"use client";

import * as React from "react";

import { useRouter } from "next/router";

import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const className = {
  root: "flex items-center justify-between px-4 py-2.5 border-b rounded-tl-2xl rounded-tr-2xl",
  btn: "shrink-0 text-error hover:text-error-focus dark:hover:text-error active:scale-95 flex items-center justify-center p-1 rounded-full",
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
}: Props) {
  const { events } = useRouter();
  React.useEffect(() => {
    if (onClose) {
      events.on("routeChangeStart", onClose);
      return () => {
        events.off("routeChangeStart", onClose);
      };
    }
  }, [onClose, events]);

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
          <X size={24} />
        </button>
      )}
    </header>
  );
}
