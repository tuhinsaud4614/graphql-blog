"use client";

import * as React from "react";

import { useParams } from "next/navigation";

import { produce } from "immer";

import { Descendant } from "slate";

import { CommentBox, ToastErrorMessage } from "@/components";
import {
  FCommentWithRepliesFragment,
  FCommentWithRepliesFragmentDoc,
  GetPostCommentsWithCursorDocument,
  GetPostCommentsWithCursorQuery,
  useCreateCommentMutation,
} from "@/graphql/generated/schema";
import { isDev } from "@/lib/isType";
import { gplErrorHandler } from "@/lib/utils";
import { toast } from "sonner";

interface Props {
  onHide?(): void;
  onSuccess?(): void;
  parentId: string;
  replyFor?: string;
}

const initialValue: Descendant[] = [
  {
    children: [{ text: "" }],
  },
];

export default function ReplyEditor({
  onHide,
  parentId,
  onSuccess,
}: Props) {
  const params = useParams<{ id: string }>();
  const postId = params?.id || "";
  const [value, setValue] = React.useState<Descendant[]>(initialValue);
  const [expand, setExpand] = React.useState(true);

  const [createComment, { loading, error }] = useCreateCommentMutation({
    notifyOnNetworkStatusChange: true,
  });

  const submitHandler = async () => {
    try {
      await createComment({
        variables: {
          data: {
            content: JSON.stringify(value),
            postId: postId,
            parentId: parentId,
          },
        },
        update(cache, { data }) {
          if (!data) {
            return;
          }

          try {
            // Update the parent comment replies cache
            cache.updateQuery<GetPostCommentsWithCursorQuery>(
              {
                query: GetPostCommentsWithCursorDocument,
                variables: { postId: postId, limit: 6, parentId },
              },
              (prevComments) => {
                const newComment = {
                  cursor: data.createComment.id,
                  node: { ...data.createComment, replies: 0 },
                };

                if (
                  !prevComments ||
                  prevComments.postCommentsWithCursor.total === 0
                ) {
                  return {
                    postCommentsWithCursor: {
                      edges: [newComment],
                      pageInfo: { hasNext: false },
                      total: 1,
                    },
                  };
                }

                const newComments = produce(prevComments, (draft) => {
                  draft.postCommentsWithCursor.edges = [
                    newComment,
                    ...draft.postCommentsWithCursor.edges,
                  ];
                  draft.postCommentsWithCursor.total += 1;
                });
                return newComments;
              },
            );

            // Update the parent reply count cache
            if (data.createComment.parentComment?.id) {
              cache.updateFragment<FCommentWithRepliesFragment>(
                {
                  fragment: FCommentWithRepliesFragmentDoc,
                  fragmentName: "FCommentWithReplies",
                  id: `Comment:${parentId}`,
                },
                (prevFrag: FCommentWithRepliesFragment | null) => {
                  return prevFrag
                    ? { ...prevFrag, replies: prevFrag.replies + 1 }
                    : undefined;
                },
              );
            }
          } catch (error) {
            isDev() && console.log(error);
          }
        },
      });
      setValue(initialValue);
      setExpand(false);
      onSuccess && onSuccess();
      onHide && onHide();
    } catch (error) {
      isDev() && console.error(error)
    }
  };

  React.useEffect(() => {
    const tempErrors = gplErrorHandler(error);
    if (tempErrors) {
      toast.error(<ToastErrorMessage error={tempErrors} />, {
        position: "top-center",
      });
    }
  }, [error]);

  return (
    <CommentBox
      value={value}
      onChange={(v) => setValue(v)}
      classes={{ root: "w-[20rem] mt-1" }}
      expanded={expand}
      onExpanded={(isExpanded) => {
        if (!isExpanded && onHide) {
          onHide();
        }
        setExpand(isExpanded);
      }}
      onSubmit={submitHandler}
      disabled={
        loading || JSON.stringify(value) === JSON.stringify(initialValue)
      }
      loader={loading}
    />
  );
}
