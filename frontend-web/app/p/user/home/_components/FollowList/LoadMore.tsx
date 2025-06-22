"use client";

import { ChevronsDownIcon } from "lucide-react";

import Button from "@/components/Button";
import useTooltip from "@/hooks/useTooltip";

interface Props {
  fetchMore(): void;
  loading?: boolean;
}

export default function FollowLoadMore({
  fetchMore,
  loading,
}: Readonly<Props>) {
  const { onHoverEnd, onHoverStart } = useTooltip();
  return (
    <Button
      onClick={fetchMore}
      onMouseEnter={(e) => {
        onHoverStart(e, {
          text: "More",
          anchorOrigin: { vertical: "top", horizontal: "center" },
          className: "px-3 py-2",
        });
      }}
      onMouseLeave={() => {
        onHoverEnd();
      }}
      type="button"
      className="size-12 shrink-0 rounded-full bg-neutral/20 [&_svg]:ml-0 [&_svg]:shrink-0"
      variant="neutral"
      mode="text"
      disabled={loading}
      loading={loading}
    >
      {loading ? null : <ChevronsDownIcon size={20} className="shrink-0" />}
    </Button>
  );
}
