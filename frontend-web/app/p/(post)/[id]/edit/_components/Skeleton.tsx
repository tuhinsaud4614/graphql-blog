
import Skeleton from "@/components/ui/Skeleton";

export default function NewPostSkeleton() {
  return (
    <article>
      <header className="mb-8">
        <Skeleton className="mb-4 h-10 w-[90%]" />
        <Skeleton className="h-6 w-full max-w-[500px]" />
      </header>
      <div className="space-y-6">
        <Skeleton className="h-64 w-full" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="p-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-5/6" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </article>
  );
}
