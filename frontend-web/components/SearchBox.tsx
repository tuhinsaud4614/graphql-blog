import classNames from "classnames";
import { forwardRef, HTMLAttributes, RefObject } from "react";
import { BiSearch } from "react-icons/bi";

const className = {
  root: "relative",
  container: "flex items-center rounded-full border",
  icon: "p-2 flex items-center justify-center text-neutral",
  input:
    "bg-transparent border-none outline-none mr-5 text-sm text-neutral w-full",
};

interface Props extends HTMLAttributes<HTMLInputElement> {
  rootRef?: RefObject<HTMLDivElement>;
  classes?: {
    root?: string;
    container?: string;
    icon?: string;
    input?: string;
  };
}

const SearchBox = forwardRef<HTMLInputElement, Props>(
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
  }
);

SearchBox.displayName = "SearchBox";
export default SearchBox;
