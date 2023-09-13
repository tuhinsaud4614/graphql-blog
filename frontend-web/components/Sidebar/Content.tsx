import * as React from "react";

import { LinkTextButton } from "@/components";
import { cn } from "@/utils";

const className = {
  title: "text-neutral dark:text-neutral-dark mb-[1.375rem] font-medium",
  items: "list-none m-0",
  more: "flex items-center text-xs w-full mt-3",
  moreLink:
    "text-success dark:text-success-dark hover:text-success-focus dark:hover:text-success active:scale-95",
};

interface Props {
  title?: string;
  moreLink?: string;
  moreText?: string;
  children?: React.ReactNode;
  classes?: {
    title?: string;
    items?: string;
    more?: string;
    moreLink?: string;
  };
}

export default function Content({
  title = "Categories",
  moreLink,
  moreText,
  children,
  classes,
}: Props) {
  return (
    <React.Fragment>
      <p className={cn(className.title, classes?.title)}>{title}</p>
      <ul className={cn(className.items, classes?.items)}>
        {children}
        {moreLink && moreText && (
          <li className={cn(className.more, classes?.more)}>
            <LinkTextButton
              href={moreLink}
              aria-label={moreText}
              className={classes?.moreLink}
            >
              {moreText}
            </LinkTextButton>
          </li>
        )}
      </ul>
    </React.Fragment>
  );
}
