"use client";

import * as React from "react";

import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

const className = {
  root: "relative",
  container:
    "flex items-center rounded-full border text-neutral-focus focus-within:text-neutral border-neutral-focus focus-within:border-neutral",
  icon: "p-2 flex items-center justify-center",
  input:
    "bg-transparent border-none outline-none mr-5 text-sm text-neutral w-full",
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
      <div className={cn(className.root, classes?.root)}>
        <div
          className={cn(className.container, classes?.container)}
          ref={rootRef}
        >
          <span className={cn(className.icon, className.icon)}>
            <Search size={24} />
          </span>
          <input
            {...rest}
            ref={ref}
            aria-label="search"
            placeholder="Search"
            className={cn(className.input, className.input, cls)}
          />
        </div>
      </div>
    );
  },
);

SearchBox.displayName = "SearchBox";
export default SearchBox;
