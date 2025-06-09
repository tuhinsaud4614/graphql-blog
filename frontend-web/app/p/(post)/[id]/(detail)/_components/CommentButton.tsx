"use client";

import { MessageSquare } from "lucide-react";

import useTooltip from "@/hooks/useTooltip";
import { cn } from "@/lib/utils";

interface Props {
  onComment?(): void;
  count: number;
  className?: string;
}

export default function CommentButton({
  count,
  className: cls,
  onComment,
}: Props) {
  const { onHoverEnd, onHoverStart } = useTooltip();
  return (
    <button
      aria-label="Comments"
      type="button"
      className={cn(
        "dark:text-neutral-dark/60 dark:hover:text-neutral-dark flex items-center border-none text-neutral/60 outline-none hover:text-neutral active:scale-95",
        cls,
      )}
      onClick={onComment}
      onMouseEnter={(e) => {
        onHoverStart(e, {
          text: "View Comments",
          anchorOrigin: { vertical: "top", horizontal: "center" },
          className: "px-3 py-2",
        });
      }}
      onMouseLeave={() => {
        onHoverEnd();
      }}
    >
      <MessageSquare
        size={20}
        className="dark:text-accent-dark text-accent hover:text-accent-focus dark:hover:text-accent"
      />
      <span className="ml-1">{count}</span>
    </button>
  );
}
