"use client";

import * as React from "react";

import LinkTextButton from "@/components/ui/LinkTextButton";
import { cn } from "@/lib/utils";

const className = {
  title: "text-neutral mb-[1.375rem] font-medium",
  items: "list-none m-0",
  more: "flex items-center text-xs w-full mt-3",
  moreLink:
    "text-success hover:text-success-focus dark:hover:text-success active:scale-95",
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

export default function SidebarContent({
  title = "Categories",
  moreLink,
  moreText,
  children,
  classes,
}: Props) {
  return (
    <>
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
    </>
  );
}
