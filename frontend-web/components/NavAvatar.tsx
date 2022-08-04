import classNames from "classnames";
import Image from "next/image";
import { ComponentPropsWithRef } from "react";

const className = {
  avatar:
    "rounded-full overflow-hidden dark:ring-1 dark:hover:ring-2 dark:ring-secondary-dark active:scale-95",
};

interface Props extends Omit<ComponentPropsWithRef<"button">, "children"> {
  src: string;
  alt: string;
  size: number;
}

export default function NavAvatar({ alt, size, src, ...rest }: Props) {
  return (
    <button {...rest} className={classNames(className.avatar, rest.className)}>
      <Image
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
