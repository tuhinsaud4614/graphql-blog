"use client";

import * as React from "react";

import { Button } from "@/components";
import {
  useSendFollowRequestMutation,
  useSendUnFollowRequestMutation,
} from "@/graphql/generated/schema";
import useUser from "@/hooks/useUser";

interface Props {
  userId: string;
  isFollowed: boolean;
}

export default function ReactorItemAction({
  userId,
  isFollowed,
}: Readonly<Props>) {
  const [follow, setFollow] = React.useState(isFollowed);
  const user = useUser();

  const [sendFollow, { loading: loadingFollow }] = useSendFollowRequestMutation(
    {
      notifyOnNetworkStatusChange: true,
    },
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
    } catch {}
  };

  return (
    <Button
      aria-label={follow ? "Follow" : "Following"}
      type="button"
      className="px-3.5 py-1.5 text-sm"
      mode={follow ? "outline" : "fill"}
      disabled={user?.id === userId || loadingFollow || unFollowLoading}
      loading={loadingFollow || unFollowLoading}
      onClick={user?.id !== userId ? onClick : undefined}
    >
      {follow ? "Following" : "Follow"}
    </Button>
  );
}
