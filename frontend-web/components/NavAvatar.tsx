"use client";

import * as React from "react";

import Image, { ImageProps } from "next/image";

import { cn } from "@/lib/utils";

interface Props extends ImageProps {
  size: number;
  btnProps?: Omit<React.ComponentPropsWithRef<"button">, "children">;
}

export default function NavAvatar({
  alt,
  size,
  src,
  btnProps,
  ...rest
}: Props) {
  return (
    <button
      {...btnProps}
      className={cn(
        "overflow-hidden rounded-full border active:scale-95 dark:border-none dark:ring-1 dark:ring-secondary dark:hover:ring-2",
        btnProps?.className,
      )}
    >
      <Image
        {...rest}
        src={src}
        alt={alt}
        width={size}
        height={size}
        objectFit="cover"
        className="rounded-full"
      />
    </button>
  );
}
