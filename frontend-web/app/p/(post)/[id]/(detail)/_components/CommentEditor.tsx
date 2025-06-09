"use client";

import * as React from "react";

import { useParams } from "next/navigation";

import { produce } from "immer";
import { Descendant } from "slate";
import { toast } from "sonner";

import {
  GetPostCommentsCountDocument,
  GetPostCommentsCountQuery,
  GetPostCommentsWithCursorDocument,
  GetPostCommentsWithCursorQuery,
  useCreateCommentMutation,
} from "@/graphql/generated/schema";
import { isDev } from "@/lib/isType";
import { gplErrorHandler } from "@/lib/utils";

import { CommentBox, CommentBoxCommenter, ToastErrorMessage } from "@/components";
import useUser from "@/hooks/useUser";


const initialValue: Descendant[] = [
  {
    children: [{ text: "" }],
  },
];

interface Props {
  commentBoxClassName?: string;
  expanded?: boolean;
}

export default function CommentEditor({
  commentBoxClassName,
  expanded,
}: Props) {
  const params = useParams<{ id: string }>();
  const postId = params?.id;

  const user = useUser()
  const [value, setValue] = React.useState<Descendant[]>(initialValue);
  const [expand, setExpand] = React.useState(expanded);

  const [createComment, { loading, error }] = useCreateCommentMutation({
    notifyOnNetworkStatusChange: true,
  });

  const submitHandler = async () => {
    try {
      await createComment({
        variables: {
          data: {
            content: JSON.stringify(value),
            postId: postId as string,
          },
        },
        update(cache, { data }) {
          if (!data) {
            return;
          }
          try {
            cache.updateQuery<GetPostCommentsWithCursorQuery>(
              {
                query: GetPostCommentsWithCursorDocument,
                variables: { postId: postId as string, limit: 6 },
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

            cache.updateQuery<GetPostCommentsCountQuery>(
              {
                query: GetPostCommentsCountDocument,
                variables: { id: postId as string },
              },
              (prevCount) => {
                return prevCount
                  ? {
                      postCommentsCount: prevCount.postCommentsCount + 1,
                    }
                  : undefined;
              },
            );
          } catch (error) {
            isDev() && console.log(error);
          }
        },
      });
      setValue(initialValue);
      setExpand(false);
    } catch (error) {
      isDev() && console.log(error);
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
      classes={{ root: commentBoxClassName }}
      expanded={expand}
      onExpanded={(isExpanded) => setExpand(isExpanded)}
      onSubmit={submitHandler}
      disabled={
        loading || JSON.stringify(value) === JSON.stringify(initialValue)
      }
      loader={loading}
    >
      {user && <CommentBoxCommenter user={user} />}
    </CommentBox>
  );
}
