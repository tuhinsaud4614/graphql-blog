import { useUserMentionTooltipStatsQuery } from "graphql/generated/schema";
import FollowAction from "./FollowAction";
import Skeleton from "./Skeleton";

const className = {
  menuBottom:
    "border-t dark:border-base-dark-300 pt-2.5 flex justify-between items-center",
  menuBottomLeft: "text-neutral/60 dark:text-neutral-dark/60 text-sm",
  skeletonCommon: "bg-neutral/20 animate-pulse dark:bg-neutral-dark/20",
};

export function Bottom({ id }: { id: string }) {
  const { loading, error, data } = useUserMentionTooltipStatsQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    variables: { id },
  });

  if (loading || error || !data?.userResult) {
    return <Skeleton />;
  }

  return (
    <div className={className.menuBottom}>
      <span className={className.menuBottomLeft}>
        {Intl.NumberFormat("en-US", {
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(data.userResult.followerCount)}{" "}
        Follower
        {data.userResult.followerCount > 1 ? "s" : ""}
      </span>
      <FollowAction isFollowed={data.userResult.hasFollow} />
    </div>
  );
}
