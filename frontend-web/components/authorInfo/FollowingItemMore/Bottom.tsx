import { selectUser } from "@features";
import { Button } from "components";
import {
  useSendFollowRequestMutation,
  useSendUnFollowRequestMutation,
  useUserMentionTooltipStatsQuery,
} from "graphql/generated/schema";
import { useEffect, useState } from "react";
import { useAppSelector } from "store";
import { followConvert } from "utils";
import Skeleton from "./Skeleton";

const className = {
  menuBottom:
    "border-t dark:border-base-dark-300 pt-2.5 flex justify-between items-center",
  menuBottomLeft: "text-neutral/60 dark:text-neutral-dark/60 text-sm",
  skeletonCommon: "bg-neutral/20 animate-pulse dark:bg-neutral-dark/20",
};

export function Bottom({ id }: { id: string }) {
  const [follow, setFollow] = useState(false);
  const [count, setCount] = useState(0);
  const rdxUser = useAppSelector(selectUser);

  const { loading, error, data } = useUserMentionTooltipStatsQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    variables: { id },
  });

  const [sendFollow, { loading: loadingFollow }] = useSendFollowRequestMutation(
    {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
    }
  );
  const [sendUnFollow, { loading: unFollowLoading }] =
    useSendUnFollowRequestMutation({
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
    });

  useEffect(() => {
    setFollow(!!data?.userResult.hasFollow);
    setCount(data?.userResult.followerCount ?? 0);
  }, [data?.userResult.hasFollow, data?.userResult.followerCount]);

  if (loading || error || !data?.userResult) {
    return <Skeleton />;
  }

  const onClick = async () => {
    try {
      if (follow) {
        await sendUnFollow({ variables: { toId: id } });
        setFollow(false);
        setCount((prev) => (!!prev ? prev - 1 : 0));
      } else {
        await sendFollow({ variables: { toId: id } });
        setFollow(true);
        setCount((prev) => prev + 1);
      }
    } catch (error) {}
  };

  return (
    <div className={className.menuBottom}>
      <span className={className.menuBottomLeft}>
        {followConvert(count, "Follower")}
      </span>
      <Button
        type="button"
        aria-label={follow ? "Following" : "Follow"}
        mode={follow ? "outline" : "fill"}
        className="text-sm !px-2 !py-0.5"
        onClick={count ? onClick : undefined}
        disabled={rdxUser?.id === id || loadingFollow || unFollowLoading}
        loading={loadingFollow || unFollowLoading}
      >
        {follow ? "Following" : "Follow"}
      </Button>
      {/* <FollowAction isFollowed={data.userResult.hasFollow} toId={id} /> */}
    </div>
  );
}
