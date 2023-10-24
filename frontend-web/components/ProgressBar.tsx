import { cn } from "@/lib/utils";

export default function ProgressBar({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      <div className="h-2.5 animate-progress-bar bg-progress bg-[length:300%_100%]" />
    </div>
  );
}
