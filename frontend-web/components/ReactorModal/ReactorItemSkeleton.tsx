import { useSynchronizeAnimation } from "@/hooks";
import { cn } from "@/utils";

const className = {
  common: "bg-neutral/20 animate-pulse dark:bg-neutral-dark/20",
  tile: "flex items-center justify-between",
  tileLeft: "flex items-start min-w-0 flex-1",
  tileName: "w-1/3 h-5 rounded-full",
  tileAbout: "mt-2 w-full h-3 rounded-full",
  tileImg: "w-10 h-10 rounded-full",
  tileBtn: "w-16 h-8 rounded-full",
};

export default function ReactorItemSkeleton() {
  const rippleRef = useSynchronizeAnimation<HTMLSpanElement>("animate-pulse");
  return (
    <li className={className.tile}>
      <div className={className.tileLeft}>
        <span
          ref={rippleRef}
          className={cn(className.common, className.tileImg)}
        />
        <span className="flex min-w-0 flex-1 flex-col px-3">
          <span
            ref={rippleRef}
            className={cn(className.common, className.tileName)}
          />
          <span
            ref={rippleRef}
            className={cn(className.common, className.tileAbout)}
          />
        </span>
      </div>
      <span
        ref={rippleRef}
        className={cn(className.common, className.tileBtn)}
      />
    </li>
  );
}
