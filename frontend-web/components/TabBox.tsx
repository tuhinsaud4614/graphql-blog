import { ReactNode } from "react";

const className = {
  root: "pt-3",
  items: "list-none m-0 pt-3",
  item: "border-b last:border-none py-5",
};

const isTrue = false;

interface Props {
  notFound?: ReactNode;
  children?: ReactNode;
}

export default function TabBox({ children, notFound }: Props) {
  if (notFound) {
    return <section className="pt-3">{notFound}</section>;
  }
  return (
    <section>
      <ul className={className.items}>{children}</ul>
    </section>
  );
}
