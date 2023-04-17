import * as React from "react";

import classNames from "classnames";

const className = {
  content: "px-4 sm:mx-auto max-w-5xl pt-10 pb-4",
};

interface Props {
  classes?: {
    root?: string;
    content?: string;
  };
  children: React.ReactNode;
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
