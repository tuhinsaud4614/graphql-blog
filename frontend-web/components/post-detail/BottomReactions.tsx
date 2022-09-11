import { setReactCount } from "features/post/reactSlice";
import {
  useGetPostCommentsCountQuery,
  useGetPostReactionsCountQuery,
} from "graphql/generated/schema";
import { useRouter } from "next/router";
import { Fragment, RefObject, useEffect, useRef } from "react";
import { useAppDispatch } from "store";
import { isDev } from "utils";
import FloatingReactions from "./FloatingReactions";
import Reactions from "./Reactions";

interface Props {
  siblingRef: RefObject<Element>;
}

export default function BottomReactions({ siblingRef }: Props) {
  const effectRan = useRef(false);
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

  useEffect(() => {
    if (effectRan.current || !isDev()) {
      rdDispatch(setReactCount({ count: reactionCount, isReacted }));
    }
    return () => {
      effectRan.current = true;
    };
  }, [isReacted, rdDispatch, reactionCount]);

  return (
    <Fragment>
      <FloatingReactions
        siblingRef={siblingRef}
        comments={commentCount?.postCommentsCount ?? 0}
      />
      <Reactions comments={commentCount?.postCommentsCount ?? 0} />
    </Fragment>
  );
}
