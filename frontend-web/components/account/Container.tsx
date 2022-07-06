import { ReactNode } from "react";

const className = {
  root: "h-screen w-screen flex items-center justify-center bg-base-200",
  container: "w-[18.875rem] p-4 shadow-md bg-base-100",
  main: "flex flex-col items-center justify-center",
  title: "tracking-[-0.03em] text-[1.5rem] leading-8 text-primary",
};

interface Props {
  title: string;
  children: ReactNode;
}

export default function Container({ children, title }: Props) {
  return (
    <section className={className.root}>
      <div className={className.container}>
        <main className={className.main}>
          <h2 className={className.title}>{title}</h2>
          {children}
        </main>
      </div>
    </section>
  );
}
