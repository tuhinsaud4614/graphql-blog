import * as React from "react";

import { cn } from "@/utils";

const className = {
  notFoundRoot: "py-[1.875rem] flex flex-col items-center",
  notFoundTitle:
    "text-neutral dark:text-neutral-dark text-sm font-normal text-center mb-6",
};

interface Props {
  children: React.ReactNode;
  classes?: { root?: string; title?: string };
}

export default function NoResultFound({ children, classes }: Props) {
  return (
    <div className={cn(className.notFoundRoot, classes?.root)}>
      <p className={cn(className.notFoundTitle, classes?.title)}>{children}</p>
    </div>
  );
}
