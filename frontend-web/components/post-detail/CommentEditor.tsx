import { useEffect, useState } from "react";
import { Descendant } from "slate";

import { selectUser } from "@features";
import { CommentBox, CommentBoxCommenter, ToastErrorMessage } from "components";
import {
  GetPostCommentsCountDocument,
  GetPostCommentsCountQuery,
  GetPostCommentsOnCursorDocument,
  GetPostCommentsOnCursorQuery,
  GetPostCommentsOnCursorQueryVariables,
  useCreateCommentMutation,
} from "graphql/generated/schema";
import produce from "immer";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useAppSelector } from "store";
import { gplErrorHandler } from "utils";

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
  const {
    query: { postId },
  } = useRouter();
  const rdxUser = useAppSelector(selectUser);
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [expand, setExpand] = useState(expanded);

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
          const existingComments = cache.readQuery<
            GetPostCommentsOnCursorQuery,
            GetPostCommentsOnCursorQueryVariables
          >({
            query: GetPostCommentsOnCursorDocument,
            variables: { postId: postId as string, limit: 6 },
          });

          const newComment = {
            cursor: data.createComment.id,
            node: { ...data.createComment, replies: 0 },
          };

          let newComments: GetPostCommentsOnCursorQuery;

          if (
            existingComments &&
            existingComments.postCommentsOnCursor.total > 0
          ) {
            newComments = produce(existingComments, (draft) => {
              draft.postCommentsOnCursor.edges = [
                newComment,
                ...draft.postCommentsOnCursor.edges,
              ];
              draft.postCommentsOnCursor.total += 1;
            });
          } else {
            newComments = {
              postCommentsOnCursor: {
                edges: [newComment],
                pageInfo: { hasNext: false },
                total: 1,
              },
            };
          }

          cache.writeQuery<GetPostCommentsOnCursorQuery>({
            query: GetPostCommentsOnCursorDocument,
            data: newComments,
            variables: { postId: postId as string, limit: 6 },
          });

          cache.writeQuery<GetPostCommentsCountQuery>({
            query: GetPostCommentsCountDocument,
            data: { postCommentsCount: newComments.postCommentsOnCursor.total },
            variables: { id: postId as string },
          });
        },
      });
      setValue(initialValue);
      setExpand(false);
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
      classes={{ root: commentBoxClassName }}
      expanded={expand}
      onExpanded={(isExpanded) => setExpand(isExpanded)}
      onSubmit={submitHandler}
      disabled={
        loading || JSON.stringify(value) === JSON.stringify(initialValue)
      }
      loader={loading}
    >
      {rdxUser && <CommentBoxCommenter user={rdxUser} />}
    </CommentBox>
  );
}
