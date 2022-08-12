import { useSynchronizeAnimation } from "@hooks";
import classNames from "classnames";

const className = {
  common: "bg-neutral/20 animate-pulse dark:bg-neutral-dark/20",
  root: "flex items-center",
  avatar: "h-8 w-8 min-w-0 rounded-full",
  mid: "flex flex-col ml-2 mr-4 flex-1",
  title: "w-2/3 h-4",
  subtitle: "mt-1 w-full h-3",
  btn: "rounded-full w-16 h-8",
};

interface Props {
  classes?: {
    root?: string;
    avatar?: string;
    mid?: string;
    title?: string;
    subtitle?: string;
    btn?: string;
  };
}

export default function FollowItemSkeleton({ classes }: Props) {
  const rippleRef = useSynchronizeAnimation<HTMLDivElement>("animate-pulse");
  return (
    <div className={classNames(className.root, classes?.root)}>
      <span
        ref={rippleRef}
        className={classNames(
          className.common,
          className.avatar,
          classes?.avatar
        )}
      />
      <div className={classNames(className.mid, classes?.mid)}>
        <span
          ref={rippleRef}
          className={classNames(
            className.common,
            className.title,
            classes?.title
          )}
        />
        <span
          ref={rippleRef}
          className={classNames(
            className.common,
            className.subtitle,
            classes?.subtitle
          )}
        />
      </div>
      <span
        ref={rippleRef}
        className={classNames(className.common, className.btn, classes?.btn)}
      />
    </div>
  );
}
