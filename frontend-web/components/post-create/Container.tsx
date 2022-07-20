import { ReactNode } from "react";

const className = { root: "h-[calc(100vh-4rem)] max-w-3xl p-5 mx-auto" };

interface Props {
  children: ReactNode;
}

export default function Container({ children }: Props) {
  return <main className={className.root}>{children}</main>;
}
