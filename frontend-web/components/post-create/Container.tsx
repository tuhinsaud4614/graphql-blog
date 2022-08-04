import classNames from "classnames";
import { ReactNode } from "react";

const className = {
  root: "mt-[calc(4rem+1px)] max-w-3xl p-5 mx-auto overflow-y-auto",
};

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className: cls }: Props) {
  return <main className={classNames(className.root, cls)}>{children}</main>;
}
