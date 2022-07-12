import { Fragment, ReactNode } from "react";

const className = {
  root: "p-4",
  title:
    "pb-2 text-sm tracking-[0.077em] text-[#757575] uppercase border-b border-neutral",
  items: "list-none mt-3 flex flex-col",
  item: "mb-3 last:mb-0",
};

interface Props {
  title: string;
  children: ReactNode;
}

export default function Result({ children, title }: Props) {
  return (
    <Fragment>
      <p className={className.title}>{title}</p>
      <ul className={className.items}>{children}</ul>
    </Fragment>
  );
}
