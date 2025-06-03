"use client";

import useTooltip from "@/hooks/useTooltip";
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";

const className = {
  commentBtn:
    "flex items-center outline-none border-none text-neutral/60 dark:text-neutral-dark/60 hover:text-neutral dark:hover:text-neutral-dark active:scale-95",
};

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
      className={cn(className.commentBtn, cls)}
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
