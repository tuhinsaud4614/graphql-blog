import { useSynchronizeAnimation } from "@hooks";
import classNames from "classnames";

const className = {
  root: "border-t dark:border-base-dark-300 pt-2.5 flex justify-between items-center",
  common: "bg-neutral/20 animate-pulse dark:bg-neutral-dark/20",
};
export default function Skeleton() {
  const rippleRef = useSynchronizeAnimation<HTMLSpanElement>("animate-pulse");
  return (
    <div className={className.root}>
      <span
        ref={rippleRef}
        className={classNames(className.common, "h-3 w-1/4 rounded-full")}
      />
      <span
        ref={rippleRef}
        className={classNames(className.common, "h-6 w-14 rounded-full")}
      />
    </div>
  );
}
