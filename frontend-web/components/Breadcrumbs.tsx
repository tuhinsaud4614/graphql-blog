"use client";

import * as React from "react";

import { LinkProps } from "next/link";

import _isFunction from "lodash/isFunction";
import _uniqueId from "lodash/uniqueId";
import { ChevronRight } from "lucide-react";
import { Link } from "next13-progressbar";

import { cn } from "@/lib/utils";

interface Props {
  /** List of items. */
  items: {
    /** Pathname of the item. */
    link?: LinkProps;
    /** Define item active or not. */
    active?: boolean;
    /** Children of the item. */
    children: React.ReactNode | ((active?: boolean) => React.ReactNode);
  }[];
  /**
   * Class name for the inner elements
   */
  classes?: {
    /** Root element `(Breadcrumbs)` className */
    root?: string;
    /** Items `(Breadcrumbs)` className */
    items?: string;
    /** Active item className of `(Breadcrumbs)` */
    active?: string;
    /** Item of className `(Breadcrumbs)`  */
    item?: string | ((active?: boolean) => string);
  };
}

export default function Breadcrumbs({ items, classes }: Props) {
  if (items.length === 0) {
    return null;
  }

  const child = (
    item: React.ReactNode | ((active?: boolean) => React.ReactNode),
    active?: boolean,
  ) => {
    if (_isFunction(item)) {
      return item(active);
    }

    return item;
  };

  return (
    <div className={cn("max-w-full overflow-x-auto py-2", classes?.root)}>
      <ul
        className={cn(
          "flex min-h-min items-center whitespace-nowrap",
          classes?.items,
        )}
      >
        {items.map(({ children, active, link }, index) => (
          <React.Fragment key={_uniqueId("bread-crumbs")}>
            {index > 0 && (
              <li className="mx-1 flex items-center text-neutral/75">
                <ChevronRight size={12} />
              </li>
            )}
            <li
              className={cn(
                "flex items-center capitalize",
                active
                  ? "text-accent"
                  : "select-none text-accent-content duration-200 hover:text-accent",
                active &&
                  "selection:bg-accent selection:text-primary-foreground",
                classes?.item &&
                  (_isFunction(classes.item)
                    ? classes.item(active)
                    : classes.item),
                active && classes?.active,
              )}
            >
              {link ? (
                <Link {...link}>{child(children, active)}</Link>
              ) : (
                child(children, active)
              )}
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
