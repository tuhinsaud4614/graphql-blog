import { ReactNode } from "react";

const className = {
  root: "mt-[calc(4rem+1px)] max-w-3xl p-5 mx-auto overflow-y-auto",
};

interface Props {
  children: ReactNode;
}

export default function Container({ children }: Props) {
  return <main className={className.root}>{children}</main>;
}
