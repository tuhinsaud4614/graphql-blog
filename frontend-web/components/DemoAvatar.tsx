import * as React from "react";

import { User2 } from "lucide-react";

import { PolymorphicPropsWithRef, PolymorphicRef } from "@/lib/types";
import { cn } from "@/lib/utils";

// type Props = React.ComponentPropsWithRef<typeof AsComponent> & {
//   size?: number;
// };

// export default function DemoAvatar({ size, ...rest }: Props) {
//   return (
//     <AsComponent {...rest}>
//       <User2 size={size} />
//     </AsComponent>
//   );
// }

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

const DemoAvatar: CompReturnType = React.forwardRef(
  <T extends React.ElementType = "div">(
    { className: cls, as, size = 20, ...rest }: Props<T>,
    ref?: PolymorphicRef<T>,
  ) => {
    const Component = as || "div";

    return (
      <Component {...rest} ref={ref} className={cn(className.root, cls)}>
        <User2 size={size} />
      </Component>
    );
  },
);

DemoAvatar.displayName = "DemoAvatar";
export default DemoAvatar;
