import useSynchronizeAnimation from "@/hooks/useSynchronizeAnimation";
import { cn } from "@/lib/utils";

const className = {
  common: "bg-neutral/20 animate-pulse",
  avatar: "w-5 h-5 rounded-full",
  img: "w-14 h-14 md:w-32 md:h-32 block",
  bar1: "h-4 w-[40%] ml-4",
  bar2: "h-5 w-[80%] mt-4",
};

export default function PostItemSkeleton() {
  const rippleRef = useSynchronizeAnimation<HTMLDivElement>("animate-pulse");
  return (
    <li className="flex">
      <section className="flex min-w-0 flex-auto flex-col pr-5">
        <div className="flex items-center">
          <span
            ref={rippleRef}
            className={cn(className.avatar, className.common)}
          />
          <span
            ref={rippleRef}
            className={cn(className.bar1, className.common)}
          />
        </div>
        <div ref={rippleRef} className={cn(className.bar2, className.common)} />
        <div ref={rippleRef} className={cn(className.bar2, className.common)} />
      </section>
      <div ref={rippleRef} className={cn(className.img, className.common)} />
    </li>
  );
}
