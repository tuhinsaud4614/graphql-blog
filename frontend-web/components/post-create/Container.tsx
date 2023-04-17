import * as React from "react";

import classNames from "classnames";

const className = {
  root: "mt-[calc(4rem+1px)] max-w-3xl p-5 mx-auto overflow-y-auto",
};

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className: cls }: Props) {
  return <main className={classNames(className.root, cls)}>{children}</main>;
}
