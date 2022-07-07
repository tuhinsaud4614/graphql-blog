import classNames from "classnames";
import { ComponentPropsWithRef, RefObject } from "react";
import { BiSearch } from "react-icons/bi";

const className = {
  root: "relative",
  container: "flex items-center rounded-full border",
  icon: "p-2 flex items-center justify-center text-neutral",
  input:
    "bg-transparent border-none outline-none mr-5 text-sm text-neutral w-full",
};

interface Props extends ComponentPropsWithRef<"input"> {
  rootRef?: RefObject<HTMLDivElement>;
  classes?: {
    root?: string;
    container?: string;
    icon?: string;
    input?: string;
  };
}

export default function SearchBox({
  rootRef,
  classes,
  className: cls,
  ...rest
}: Props) {
  return (
    <div className={classNames(className.root, classes?.root)}>
      <div
        className={classNames(className.container, classes?.container)}
        ref={rootRef}
      >
        <span className={classNames(className.icon, className.icon)}>
          <BiSearch size={24} />
        </span>
        <input
          {...rest}
          aria-label="search"
          placeholder="Search"
          className={classNames(className.input, className.input, cls)}
        />
      </div>
    </div>
  );
}
