"use client";

import * as React from "react";


import { toast } from "sonner";

import HeartToggle from "@/components/HeartToggle";
import {
  EToggleMutationStatus,
  GetPostItemFragment,
  useIsBookmarkedQuery,
  useToggleBookmarkMutation,
} from "@/graphql/generated/schema";
import useUser from "@/hooks/useUser";
import { isDev } from "@/lib/isType";


interface Props {
  author: GetPostItemFragment["author"];
  postId: GetPostItemFragment["id"];
}

export default function AddToBookmark({author,postId}: Props) {
  const [bookmarked, setBookmarked] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const authUser = useUser();

  const { loading, data } = useIsBookmarkedQuery({
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    variables: { postId: postId || "" },
  });

  const isBookmarked = data?.isBookmarked;

  React.useEffect(() => {
    if (isBookmarked !== undefined) {
      setBookmarked(isBookmarked);
    }
  }, [isBookmarked]);

  const [toggleBookmark] = useToggleBookmarkMutation({
    notifyOnNetworkStatusChange: true,
  });

  const bookmarkedHandler = async (prevState: boolean) => {
    if (!authUser || authUser.id === author.id) {
      toast.warning("You can't bookmark your own post", {
        position: "top-center",
      });
      return;
    }
    try {
      setLoaded(true);
      const nextReacted = !prevState;
      setBookmarked(nextReacted);
      const { data } = await toggleBookmark({
        variables: { postId: postId },
      });
      if (data?.toggleBookmark) {
        // Confirm with server response
        const confirmedBookmarked =
          data.toggleBookmark === EToggleMutationStatus.Added;
        setBookmarked(confirmedBookmarked);
      }
    } catch (error) {
      // Rollback on error
      setBookmarked(prevState);
      isDev() && console.log(error);
    }
  };
  return (
    <HeartToggle
      className="size-5 text-secondary"
      classNames={{ celebrate: "size-10 stroke-[3]" }}
      value={bookmarked}
      onValueChange={bookmarkedHandler}
      disabled={loading}
      skipInitialAnimation={!loaded}
    />
  );
}
