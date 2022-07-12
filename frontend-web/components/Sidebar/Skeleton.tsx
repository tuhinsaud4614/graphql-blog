import { useSynchronizeAnimation } from "@hooks";
import classNames from "classnames";

const className = {
  root: "flex flex-col space-y-2",
  bar: "animate-pulse bg-neutral/20",
  bar1: "h-5 w-[40%]",
  bar2: "h-[1.125rem] w-[90%]",
  bar3: "h-3.5 w-[70%]",
};

export default function Skeleton() {
  const rippleRef = useSynchronizeAnimation<HTMLSpanElement>("animate-pulse");
  return (
    <div className={className.root}>
      <span
        ref={rippleRef}
        className={classNames(className.bar, className.bar1)}
      />
      <span
        ref={rippleRef}
        className={classNames(className.bar, className.bar2)}
      />
      <span
        ref={rippleRef}
        className={classNames(className.bar, className.bar3)}
      />
    </div>
  );
}
