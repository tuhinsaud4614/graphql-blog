"use client";

import * as React from "react";

import { useParams } from "next/navigation";

import { useReactDispatch } from "@/app/p/(post)/_context/react-count-context";
import {
  useGetPostCommentsCountQuery,
  useGetPostReactionsCountQuery,
} from "@/graphql/generated/schema";
import { isDev } from "@/lib/isType";

import FloatingReactions from "./FloatingReactions";
import Reactions from "./Reactions";

interface Props {
  siblingRef: React.RefObject<Element>;
}

export default function BottomReactions({ siblingRef }: Props) {
  const effectRan = React.useRef(false);

  const params = useParams<{ id: string }>();
  const postId = params?.id || "";

  const { data } = useGetPostReactionsCountQuery({
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    variables: { id: postId },
  });

  const { data: commentCount } = useGetPostCommentsCountQuery({
    notifyOnNetworkStatusChange: true,
    variables: { id: postId },
  });

  const reactDispatch = useReactDispatch();

  const reactionCount = data?.postReactionsCount.count ?? 0;
  const isReacted = !!data?.postReactionsCount.reacted;

  React.useEffect(() => {
    if (effectRan.current || !isDev()) {
      reactDispatch({
        type: "setReactCount",
        payload: { count: reactionCount, isReacted },
      });
    }
    return () => {
      effectRan.current = true;
    };
  }, [isReacted, reactDispatch, reactionCount]);

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
