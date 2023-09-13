import { useSynchronizeAnimation } from "@/hooks";
import { cn } from "@/utils";

const className = {
  root: "flex items-center justify-between",
  common: "bg-neutral/20 animate-pulse dark:bg-neutral-dark/20",
  link: "flex items-center min-w-0 flex-1",
  img: "h-5 w-5 rounded-full",
  text: "ml-3 w-2/3 h-3 rounded-full",
  more: "h-7 w-7 rounded-full",
};

export default function FollowingItemSkeleton() {
  const rippleRef = useSynchronizeAnimation<HTMLSpanElement>("animate-pulse");
  return (
    <li className={className.root}>
      <div className={className.link}>
        <span ref={rippleRef} className={cn(className.common, className.img)} />
        <span
          ref={rippleRef}
          className={cn(className.common, className.text)}
        />
      </div>
      <span ref={rippleRef} className={cn(className.common, className.more)} />
    </li>
  );
}
