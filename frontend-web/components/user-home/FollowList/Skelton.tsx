import { useSynchronizeAnimation } from "@/hooks";

const className = {
  root: "flex items-center space-x-2 overflow-hidden",
  box: "animate-pulse bg-neutral/20 h-16 w-16 shrink-0 rounded-full",
};
export default function FollowSkeleton() {
  const rippleRef = useSynchronizeAnimation<HTMLSpanElement>("animate-pulse");
  return (
    <div className={className.root}>
      {Array.from({ length: 10 }).map((_, index) => (
        <span key={index} ref={rippleRef} className={className.box} />
      ))}
    </div>
  );
}
