import { useSynchronizeAnimation } from "@hooks";
import classNames from "classnames";

const className = {
  root: "flex flex-col",
  top: "flex items-center",
  common: "bg-neutral/20 animate-pulse dark:bg-neutral-dark/20",
  avatar: "w-5 h-5 rounded-full",
  bar1: "h-4 w-[50%] ml-2",
  bar2: "h-5 w-[100%] mt-2",
  bar3: "h-3 w-[30%] mt-2",
};

export default function PostItemSkeleton() {
  const rippleRef = useSynchronizeAnimation<HTMLDivElement>("animate-pulse");
  return (
    <li className={className.root}>
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
        className={classNames(className.bar3, className.common)}
      />
    </li>
  );
}
