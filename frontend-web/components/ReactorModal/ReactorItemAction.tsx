import { selectUser } from "@features";
import { Button } from "components";
import {
  useSendFollowRequestMutation,
  useSendUnFollowRequestMutation,
} from "graphql/generated/schema";
import { useState } from "react";
import { useAppSelector } from "store";

interface Props {
  userId: string;
  isFollowed: boolean;
}

export default function ReactorItemAction({ userId, isFollowed }: Props) {
  const [follow, setFollow] = useState(isFollowed);
  const rdxUser = useAppSelector(selectUser);

  const [sendFollow, { loading: loadingFollow }] = useSendFollowRequestMutation(
    {
      notifyOnNetworkStatusChange: true,
    }
  );
  const [sendUnFollow, { loading: unFollowLoading }] =
    useSendUnFollowRequestMutation({
      notifyOnNetworkStatusChange: true,
    });

  const onClick = async () => {
    try {
      if (follow) {
        await sendUnFollow({ variables: { toId: userId } });
        setFollow(false);
      } else {
        await sendFollow({ variables: { toId: userId } });
        setFollow(true);
      }
    } catch (error) {}
  };

  return (
    <Button
      aria-label={follow ? "Follow" : "Following"}
      type="button"
      className="px-3.5 py-1.5 text-sm"
      mode={follow ? "outline" : "fill"}
      disabled={rdxUser?.id === userId || loadingFollow || unFollowLoading}
      loading={loadingFollow || unFollowLoading}
      onClick={rdxUser?.id !== userId ? onClick : undefined}
    >
      {follow ? "Following" : "Follow"}
    </Button>
  );
}
