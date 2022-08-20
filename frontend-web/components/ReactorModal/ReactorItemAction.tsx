import classNames from "classnames";
import { Button } from "components";
import { useUserMentionTooltipStatsQuery } from "graphql/generated/schema";

const className = {
  skeltonCommon:
    "bg-neutral/20 animate-pulse dark:bg-neutral-dark/20 rounded-full",
  skeletonText: "w-16 h-6",
  skeletonBtn: "w-24 h-8 mt-3",
};

interface Props {
  userId: string;
}

export default function ReactorItemAction({ userId }: Props) {
  const { data, loading, error } = useUserMentionTooltipStatsQuery({
    notifyOnNetworkStatusChange: true,
    variables: { id: userId },
  });

  if (loading || error || !data?.userResult) {
    return (
      <span
        className={classNames(className.skeltonCommon, className.skeletonBtn)}
      />
    );
  }
  return (
    <Button
      aria-label={data.userResult.hasFollow ? "Follow" : "Following"}
      type="button"
      className="px-3.5 py-1.5 text-sm"
      mode={data.userResult.hasFollow ? "outline" : "fill"}
    >
      {data.userResult.hasFollow ? "Following" : "Follow"}
    </Button>
  );
}
