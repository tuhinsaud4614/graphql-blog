import * as React from "react";

import { notify } from "@/features";
import {
  FollowingMutationStatus,
  useFollowingSubscription,
} from "@/graphql/generated/schema";
import { useAppDispatch } from "@/store";

export default function Notification() {
  const { data } = useFollowingSubscription({
    fetchPolicy: "network-only",
  });

  const rdxDispatch = useAppDispatch();

  React.useEffect(() => {
    if (data?.following.mutation === FollowingMutationStatus.Follow) {
      rdxDispatch(
        notify({
          followedBy: data.following.followedBy,
          mutation: data.following.mutation,
          type: "FOLLOWING",
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return null;
}
