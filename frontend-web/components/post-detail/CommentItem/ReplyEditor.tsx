import { CommentBox, ToastErrorMessage } from "components";
import {
  GetPostCommentsOnCursorDocument,
  GetPostCommentsOnCursorQuery,
  GetPostCommentsOnCursorQueryVariables,
  useCreateCommentMutation,
} from "graphql/generated/schema";
import produce from "immer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Descendant } from "slate";
import { gplErrorHandler } from "utils";

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
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [expand, setExpand] = useState(true);

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
          const existingReplies = cache.readQuery<
            GetPostCommentsOnCursorQuery,
            GetPostCommentsOnCursorQueryVariables
          >({
            query: GetPostCommentsOnCursorDocument,
            variables: { postId: postId as string, limit: 6, parentId },
          });

          const newReply = {
            cursor: data.createComment.id,
            node: { ...data.createComment, replies: 0 },
          };

          let newReplies: GetPostCommentsOnCursorQuery;

          if (
            existingReplies &&
            existingReplies.postCommentsOnCursor.total > 0
          ) {
            newReplies = produce(existingReplies, (draft) => {
              draft.postCommentsOnCursor.edges = [
                newReply,
                ...draft.postCommentsOnCursor.edges,
              ];
              draft.postCommentsOnCursor.total += 1;
            });
          } else {
            newReplies = {
              postCommentsOnCursor: {
                edges: [newReply],
                pageInfo: { hasNext: false },
                total: 1,
              },
            };
          }

          cache.writeQuery<GetPostCommentsOnCursorQuery>({
            query: GetPostCommentsOnCursorDocument,
            data: newReplies,
            variables: {
              postId: postId as string,
              parentId: parentId,
              limit: 6,
            },
          });

          const existingComments = cache.readQuery<
            GetPostCommentsOnCursorQuery,
            GetPostCommentsOnCursorQueryVariables
          >({
            query: GetPostCommentsOnCursorDocument,
            variables: {
              postId: postId as string,
              limit: 6,
              parentId: replyFor,
            },
          });

          if (existingComments) {
            const newComments = produce(existingComments, (draft) => {
              const commentIndex = draft.postCommentsOnCursor.edges.findIndex(
                (comment) =>
                  comment.cursor === data.createComment.parentComment?.id
              );

              if (commentIndex !== -1) {
                draft.postCommentsOnCursor.edges[
                  commentIndex
                ].node.replies += 1;
              }
            });

            cache.writeQuery<GetPostCommentsOnCursorQuery>({
              query: GetPostCommentsOnCursorDocument,
              data: newComments,
              variables: {
                postId: postId as string,
                limit: 6,
                parentId: replyFor,
              },
            });
          }
        },
      });
      setValue(initialValue);
      setExpand(false);
      onSuccess && onSuccess();
      onHide && onHide();
    } catch (error) {}
  };

  useEffect(() => {
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
