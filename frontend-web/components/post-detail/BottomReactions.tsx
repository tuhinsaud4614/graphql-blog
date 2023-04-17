import * as React from "react";

import { useRouter } from "next/router";

import { setReactCount } from "@/features";
import {
  useGetPostCommentsCountQuery,
  useGetPostReactionsCountQuery,
} from "@/graphql/generated/schema";
import { useAppDispatch } from "@/store";
import { isDev } from "@/utils";

import FloatingReactions from "./FloatingReactions";
import Reactions from "./Reactions";

interface Props {
  siblingRef: React.RefObject<Element>;
}

export default function BottomReactions({ siblingRef }: Props) {
  const effectRan = React.useRef(false);
  const {
    query: { postId },
  } = useRouter();

  const { data } = useGetPostReactionsCountQuery({
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    variables: { id: postId as string },
  });

  const { data: commentCount } = useGetPostCommentsCountQuery({
    notifyOnNetworkStatusChange: true,
    variables: { id: postId as string },
  });

  const rdDispatch = useAppDispatch();

  const reactionCount = data?.postReactionsCount.count ?? 0;
  const isReacted = !!data?.postReactionsCount.reacted;

  React.useEffect(() => {
    if (effectRan.current || !isDev()) {
      rdDispatch(setReactCount({ count: reactionCount, isReacted }));
    }
    return () => {
      effectRan.current = true;
    };
  }, [isReacted, rdDispatch, reactionCount]);

  return (
    <React.Fragment>
      <FloatingReactions
        siblingRef={siblingRef}
        comments={commentCount?.postCommentsCount ?? 0}
      />
      <Reactions comments={commentCount?.postCommentsCount ?? 0} />
    </React.Fragment>
  );
}
