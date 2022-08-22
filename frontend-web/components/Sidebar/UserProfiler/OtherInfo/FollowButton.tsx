import { Button } from "components";
import {
  useSendFollowRequestMutation,
  useSendUnFollowRequestMutation
} from "graphql/generated/schema";
import { useState } from "react";

interface Props {
  isFollowed: boolean;
  toId: string;
  onFollow(isFollowed: boolean): void;
}

export default function FollowButton({ isFollowed, toId, onFollow }: Props) {
  const [follow, setFollow] = useState(isFollowed);
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

  const onClick = async () => {
    try {
      if (follow) {
        await sendUnFollow({ variables: { toId } });
        setFollow(false);
        onFollow(false);
      } else {
        await sendFollow({ variables: { toId } });
        setFollow(true);
        onFollow(true);
      }
    } catch (error) {}
  };
  return (
    <Button
      aria-label={follow ? "Following" : "Follow"}
      type="button"
      className="mt-3 text-sm"
      mode={follow ? "outline" : "fill"}
      onClick={onClick}
      disabled={loadingFollow || unFollowLoading}
      loading={loadingFollow || unFollowLoading}
    >
      {follow ? "Following" : "Follow"}
    </Button>
  );
}
