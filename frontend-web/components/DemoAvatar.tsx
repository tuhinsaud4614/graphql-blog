import { PolymorphicPropsWithRef, PolymorphicRef } from "@types";
import classNames from "classnames";
import { forwardRef } from "react";
import { FaUserAlt } from "react-icons/fa";

const className = {
  root: "shrink-0 outline-none flex items-center justify-center border rounded-full text-secondary dark:text-secondary-dark bg-base-100 dark:bg-base-dark-100 dark:border-none dark:ring-2 dark:ring-secondary-content",
};

type Props<T extends React.ElementType> = PolymorphicPropsWithRef<
  T,
  {
    size?: number;
  }
>;

const Comp: (<T extends React.ElementType = "div">(
  props: Props<T>
) => React.ReactElement | null) & { displayName?: string } = forwardRef(
  <T extends React.ElementType = "div">(
    { className: cls, as, size = 20, ...rest }: Props<T>,
    ref?: PolymorphicRef<T>
  ) => {
    const Component = as || "div";

    return (
      <Component
        {...rest}
        ref={ref}
        className={classNames(className.root, cls)}
      >
        <FaUserAlt size={size} />
      </Component>
    );
  }
);

Comp.displayName = "DemoAvatar";
const DemoAvatar = Comp;
export default DemoAvatar;
