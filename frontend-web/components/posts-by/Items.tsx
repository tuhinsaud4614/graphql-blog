import { ReactNode } from "react";

const className = {
  items: "list-none m-0 pt-3",
};
interface Props {
  children?: ReactNode;
}

export default function Items({ children }: Props) {
  return <ul className={className.items}>{children}</ul>;
}
