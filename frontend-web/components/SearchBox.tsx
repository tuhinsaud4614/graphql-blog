import * as React from "react";

import classNames from "classnames";
import { BiSearch } from "react-icons/bi";

const className = {
  root: "relative",
  container: "flex items-center rounded-full border dark:border-base-dark-300",
  icon: "p-2 flex items-center justify-center text-neutral dark:text-base-dark-300",
  input:
    "bg-transparent border-none outline-none mr-5 text-sm text-neutral dark:text-neutral-dark w-full",
};

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  rootRef?: React.RefObject<HTMLDivElement>;
  classes?: {
    root?: string;
    container?: string;
    icon?: string;
    input?: string;
  };
}

const SearchBox = React.forwardRef<HTMLInputElement, Props>(
  ({ rootRef, classes, className: cls, ...rest }, ref) => {
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
            ref={ref}
            aria-label="search"
            placeholder="Search"
            className={classNames(className.input, className.input, cls)}
          />
        </div>
      </div>
    );
  },
);

SearchBox.displayName = "SearchBox";
export default SearchBox;
