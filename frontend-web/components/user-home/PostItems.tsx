import { ReactNode } from "react";

const className = "list-none m-0 pt-3";

interface Props {
  children: ReactNode;
}

export default function PostItems({ children }: Props) {
  return (
    <section>
      <ul className={className}>{children}</ul>
    </section>
  );
}
