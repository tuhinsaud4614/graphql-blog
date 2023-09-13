import * as React from "react";

import { cn } from "@/utils";

const className = {
  root: "pt-3",
  items: "list-none m-0 pt-3",
};

interface Props {
  notFound?: React.ReactNode;
  children?: React.ReactNode;
  classes?: {
    root?: string;
    items?: string;
  };
}

export default function TabBox({ children, notFound, classes }: Props) {
  if (notFound) {
    return <section className={cn("pt-3", classes?.root)}>{notFound}</section>;
  }
  return (
    <React.Fragment>
      <ul className={cn(className.items, classes?.items)}>{children}</ul>
    </React.Fragment>
  );
}
