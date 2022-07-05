import classNames from "classnames";
import { ReactNode } from "react";

const className = {
  content: "px-4 sm:mx-auto max-w-5xl pt-10 pb-4",
};

interface Props {
  classes?: {
    root?: string;
    content?: string;
  };
  children: ReactNode;
}

export default function Wrapper({ children, classes }: Props) {
  return (
    <section className={classNames(classes?.root)}>
      <div className={classNames(className.content, classes?.content)}>
        {children}
      </div>
    </section>
  );
}
