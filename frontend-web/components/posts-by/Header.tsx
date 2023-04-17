import * as React from "react";

const className = {
  header: "flex items-center",
  tag: "w-7 h-7 bg-base-200 dark:bg-base-dark-200 text-neutral dark:text-neutral-dark flex items-center justify-center rounded-full",
  title:
    "text-[1.375rem] sm:text-[2rem] line-clamp-1 text-ellipsis text-neutral dark:text-neutral-dark font-bold ml-2",
};

interface Props {
  title: string;
  icon: React.ReactNode;
}
export default function Header({ title, icon }: Props) {
  return (
    <div className={className.header}>
      <span className={className.tag}>{icon}</span>
      <h1 className={className.title}>{title}</h1>
    </div>
  );
}
