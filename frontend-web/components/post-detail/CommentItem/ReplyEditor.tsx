import * as React from "react";

import { useRouter } from "next/router";

import produce from "immer";
import { toast } from "react-toastify";
import { Descendant } from "slate";

import { CommentBox, ToastErrorMessage } from "@/components";
import {
  FCommentWithRepliesFragment,
  FCommentWithRepliesFragmentDoc,
  GetPostCommentsWithCursorDocument,
  GetPostCommentsWithCursorQuery,
  useCreateCommentMutation,
} from "@/graphql/generated/schema";
import { gplErrorHandler, isDev } from "@/utils";

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
  replyFor,
}: Props) {
  const {
    query: { postId },
  } = useRouter();
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
            postId: postId as string,
            parentComment: parentId,
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
                variables: { postId: postId as string, limit: 6, parentId },
              },
              (prevComments) => {
                const newComment = {
                  cursor: data.createComment.id,
                  node: { ...data.createComment, replies: 0 },
                };

                if (
                  !prevComments ||
                  prevComments.postCommentsOnCursor.total === 0
                ) {
                  return {
                    postCommentsOnCursor: {
                      edges: [newComment],
                      pageInfo: { hasNext: false },
                      total: 1,
                    },
                  };
                }

                const newComments = produce(prevComments, (draft) => {
                  draft.postCommentsOnCursor.edges = [
                    newComment,
                    ...draft.postCommentsOnCursor.edges,
                  ];
                  draft.postCommentsOnCursor.total += 1;
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
                (prevFrag) => {
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
    } catch (error) {}
  };

  React.useEffect(() => {
    const tempErrors = gplErrorHandler(error);
    if (tempErrors) {
      toast.error(<ToastErrorMessage error={tempErrors} />, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
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
