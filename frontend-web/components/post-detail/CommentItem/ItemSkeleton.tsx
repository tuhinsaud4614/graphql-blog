import { useSynchronizeAnimation } from "@hooks";
import classNames from "classnames";

const className = {
  root: "flex flex-col px-4",
  top: "flex items-center",
  avatar: "w-8 h-8 rounded-full shrink-0",
  topRight: "flex flex-col w-full ml-3",
  bar1: "h-4 w-[30%] rounded-full",
  bar2: "h-3 w-[50%] mt-2 rounded-full",
  common: "bg-neutral/20 animate-pulse dark:bg-neutral-dark/20",
  bottom: "flex flex-col space-y-2 mt-3",
  bar3: "h-4 w-full rounded-full",
};

interface Props {
  classes?: { root?: string };
}

export default function CommentItemSkeleton({ classes }: Props) {
  const rippleRef = useSynchronizeAnimation<HTMLSpanElement>("animate-pulse");
  return (
    <div className={classNames(className.root, classes?.root)}>
      <div className={className.top}>
        <span
          className={classNames(className.common, className.avatar)}
          ref={rippleRef}
        />
        <div className={className.topRight}>
          <span
            className={classNames(className.common, className.bar1)}
            ref={rippleRef}
          />
          <span
            className={classNames(className.common, className.bar2)}
            ref={rippleRef}
          />
        </div>
      </div>
      <div className={className.bottom}>
        <span
          className={classNames(className.common, className.bar3)}
          ref={rippleRef}
        />
        <span
          className={classNames(className.common, className.bar3)}
          ref={rippleRef}
        />
        <span
          className={classNames(className.common, className.bar3)}
          ref={rippleRef}
        />
      </div>
    </div>
  );
}
