"use client";

import * as React from "react";

import { User2 } from "lucide-react";

import { PolymorphicPropsWithRef, PolymorphicRef } from "@/lib/types";
import { cn } from "@/lib/utils";

const className = {
  root: "shrink-0 outline-none flex items-center justify-center border rounded-full text-secondary bg-transparent dark:border-none dark:ring-2 dark:ring-secondary-content",
};

type Props<T extends React.ElementType> = PolymorphicPropsWithRef<
  T,
  {
    size?: number;
  }
>;

type CompReturnType = (<T extends React.ElementType = "div">(
  props: Props<T>,
) => React.ReactNode) & { displayName?: string };

const Avatar: CompReturnType = <T extends React.ElementType = "div">(
  { className: cls, as, size = 20, ...rest }: Props<T>,
  ref?: PolymorphicRef<T>,
) => {
  const Component = as || "div";

  return (
    <Component {...rest} ref={ref} className={cn(className.root, cls)}>
      <User2 size={size} />
    </Component>
  );
};

const DemoAvatar = React.forwardRef(Avatar);

DemoAvatar.displayName = "DemoAvatar";
export default DemoAvatar;
