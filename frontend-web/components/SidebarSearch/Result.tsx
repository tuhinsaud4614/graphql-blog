import * as React from "react";

const className = {
  root: "p-4",
  title:
    "pb-2 text-sm tracking-[0.077em] text-neutral/75 dark:text-neutral-dark/75 uppercase border-b dark:border-base-dark-100",
  items: "list-none mt-3 flex flex-col",
  item: "mb-3 last:mb-0",
};

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Result({ children, title }: Props) {
  return (
    <React.Fragment>
      <p className={className.title}>{title}</p>
      <ul className={className.items}>{children}</ul>
    </React.Fragment>
  );
}
