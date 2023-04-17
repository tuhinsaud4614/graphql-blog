import * as React from "react";

import { useRouter } from "next/router";

import produce from "immer";
import { toast } from "react-toastify";
import { Descendant } from "slate";

import {
  CommentBox,
  CommentBoxCommenter,
  ToastErrorMessage,
} from "@/components";
import { selectUser } from "@/features";
import {
  GetPostCommentsCountDocument,
  GetPostCommentsCountQuery,
  GetPostCommentsOnCursorDocument,
  GetPostCommentsOnCursorQuery,
  useCreateCommentMutation,
} from "@/graphql/generated/schema";
import { useAppSelector } from "@/store";
import { gplErrorHandler, isDev } from "@/utils";

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
            cache.updateQuery<GetPostCommentsOnCursorQuery>(
              {
                query: GetPostCommentsOnCursorDocument,
                variables: { postId: postId as string, limit: 6 },
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
