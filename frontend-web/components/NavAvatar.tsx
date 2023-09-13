import * as React from "react";

import Image, { ImageProps } from "next/image";

import { cn } from "@/utils";

const className = {
  avatar:
    "rounded-full overflow-hidden border dark:border-none dark:ring-1 dark:hover:ring-2 dark:ring-secondary-dark active:scale-95",
};

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
    <button {...btnProps} className={cn(className.avatar, btnProps?.className)}>
      <Image
        {...rest}
        src={src}
        alt={alt}
        width={size}
        height={size}
        objectFit="cover"
        layout="responsive"
        className="rounded-full"
      />
    </button>
  );
}
