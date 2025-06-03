import { cn } from "@/lib/utils";
import * as React from "react";


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

export default function Wrapper({ children, classes }: Readonly<Props>) {
  return (
    <section className={cn(classes?.root)}>
      <div className={cn(className.content, classes?.content)}>{children}</div>
    </section>
  );
}
