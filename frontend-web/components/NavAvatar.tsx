import classNames from "classnames";
import Image, { ImageProps } from "next/image";
import { ComponentPropsWithRef } from "react";

const className = {
  avatar:
    "rounded-full overflow-hidden border dark:border-none dark:ring-1 dark:hover:ring-2 dark:ring-secondary-dark active:scale-95",
};

interface Props extends ImageProps {
  size: number;
  btnProps?: Omit<ComponentPropsWithRef<"button">, "children">;
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
      className={classNames(className.avatar, btnProps?.className)}
    >
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
