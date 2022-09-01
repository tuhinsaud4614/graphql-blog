import { HomeHeader } from "components/home";
import { ReactNode } from "react";

const className = {
  root: "h-screen w-screen pt-16 flex items-center justify-center bg-base-200 dark:bg-base-dark-200",
  container:
    "w-[90%] max-w-sm p-4 shadow-mui-hover rounded-2xl bg-base-100 dark:bg-base-dark-100 overflow-y-auto max-h-[calc(100vh-6rem)]",
  main: "flex flex-col items-center justify-center",
  title:
    "tracking-[-0.03em] text-[1.5rem] leading-8 line-clamp-1 text-ellipsis text-secondary dark:text-secondary-dark",
};

interface Props {
  title: string;
  children: ReactNode;
}

export default function Container({ children, title }: Props) {
  return (
    <section className={className.root}>
      <HomeHeader />
      <div className={className.container}>
        <main className={className.main}>
          <h2 className={className.title}>{title}</h2>
          {children}
        </main>
      </div>
    </section>
  );
}
