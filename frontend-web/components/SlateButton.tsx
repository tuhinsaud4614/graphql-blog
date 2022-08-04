import classNames from "classnames";
import { ComponentPropsWithoutRef } from "react";

const className = {
  root: "p-1.5 rounded flex items-center justify-center",
  rootState: (status: boolean) =>
    status
      ? "bg-green-50 dark:bg-success-dark text-green-500 dark:text-neutral-dark"
      : "text-neutral/60 dark:text-neutral-dark hover:bg-zinc-100 dark:hover:bg-success-dark",
};

interface Props extends ComponentPropsWithoutRef<"button"> {
  isActive?: boolean;
}

export default function Button({ isActive = false, ...props }: Props) {
  return (
    <button
      {...props}
      type="button"
      className={classNames(
        className.root,
        className.rootState(isActive),
        props.className
      )}
    />
  );
}
