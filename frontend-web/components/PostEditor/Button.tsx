import classNames from "classnames";
import { ComponentPropsWithoutRef } from "react";

const className = {
  root: "p-1.5 first:ml-2 first:mt-2 rounded flex items-center justify-center",
  rootState: (status: boolean) =>
    status ? "bg-green-50 text-green-500" : "text-neutral/60 hover:bg-zinc-100",
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
