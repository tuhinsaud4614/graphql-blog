import * as React from "react";

import { cn } from "@/lib/utils";

interface Props {
  classes?: {
    root?: string;
    content?: string;
  };
  children: React.ReactNode;
}

export default function LandingContainer({ children, classes }: Props) {
  return (
    <section className={cn(classes?.root)}>
      <div
        className={cn("max-w-5xl px-4 pb-4 pt-10 sm:mx-auto", classes?.content)}
      >
        {children}
      </div>
    </section>
  );
}
