import { Loader2Icon } from "lucide-react";

import { ChatPop } from "@/components/svg";
import {
    GetPostItemFragment,
    useGetPostCommentsCountQuery,
} from "@/graphql/generated/schema";
import useTooltip from "@/hooks/useTooltip";
import { cn, countConvert } from "@/lib/utils";

interface Props {
  className?: string;
  postId: GetPostItemFragment["id"];
}

export default function PostItemComments({
  className: cls,
  postId,
}: Readonly<Props>) {
  const { onHoverEnd, onHoverStart } = useTooltip();

  const { data, loading } = useGetPostCommentsCountQuery({
    notifyOnNetworkStatusChange: true,
    variables: { id: postId },
  });

  const totalCount = data?.postCommentsCount ?? 0;

  if (loading) {
    return <Loader2Icon size={20} className="animate-spin" />;
  }

  return (
    <span
      aria-label="Total comments"
      className={cn(
        "dark:text-neutral-dark/60 flex items-center text-neutral/60",
        cls,
      )}
      onMouseEnter={(e) => {
        onHoverStart(e, {
          text: "Total comments",
          anchorOrigin: { vertical: "top", horizontal: "center" },
          className: "px-3 py-2",
        });
      }}
      onMouseLeave={() => {
        onHoverEnd();
      }}
    >
      <ChatPop size={20} className="text-success" />
      <span className="ml-1">{countConvert(totalCount)}</span>
    </span>
  );
}
