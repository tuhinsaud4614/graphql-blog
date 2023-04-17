import classNames from "classnames";

import { useSynchronizeAnimation } from "@/hooks";

const className = {
  root: "flex",
  left: "flex flex-col min-w-0 flex-auto pr-5",
  top: "flex items-center",
  common: "bg-neutral/20 animate-pulse dark:bg-neutral-dark/20",
  avatar: "w-5 h-5 rounded-full",
  img: "w-14 h-14 md:w-32 md:h-32 block",
  bar1: "h-4 w-[40%] ml-4",
  bar2: "h-5 w-[80%] mt-4",
};

export default function PostItemSkeleton() {
  const rippleRef = useSynchronizeAnimation<HTMLDivElement>("animate-pulse");
  return (
    <li className={className.root}>
      <section className={className.left}>
        <div className={className.top}>
          <span
            ref={rippleRef}
            className={classNames(className.avatar, className.common)}
          />
          <span
            ref={rippleRef}
            className={classNames(className.bar1, className.common)}
          />
        </div>
        <div
          ref={rippleRef}
          className={classNames(className.bar2, className.common)}
        />
        <div
          ref={rippleRef}
          className={classNames(className.bar2, className.common)}
        />
      </section>
      <div
        ref={rippleRef}
        className={classNames(className.img, className.common)}
      />
    </li>
  );
}
