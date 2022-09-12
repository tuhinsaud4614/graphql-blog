import { CommentBox, ToastErrorMessage } from "components";
import {
  GetCommentRepliesOnCursorDocument,
  GetPostCommentsOnCursorDocument,
  useCreateCommentMutation,
} from "graphql/generated/schema";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Descendant } from "slate";
import { gplErrorHandler } from "utils";

interface Props {
  onHide?(): void;
  parentId: string;
}

const initialValue: Descendant[] = [
  {
    children: [{ text: "" }],
  },
];

export default function ReplyEditor({ onHide, parentId }: Props) {
  console.log(parentId);

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
        refetchQueries: [
          {
            query: GetCommentRepliesOnCursorDocument,
            variables: { commentId: parentId, limit: 3 },
            fetchPolicy: "network-only",
          },
          {
            query: GetPostCommentsOnCursorDocument,
            variables: { postId: postId as string, limit: 6 },
            fetchPolicy: "network-only",
          },
        ],
        // update(cache, { data }) {
        //   if (!data) {
        //     return;
        //   }
        //   const existingComments = cache.readQuery<
        //     GetPostCommentsOnCursorQuery,
        //     GetPostCommentsOnCursorQueryVariables
        //   >({
        //     query: GetPostCommentsOnCursorDocument,
        //     variables: { postId: postId as string, limit: 6 },
        //   });

        //   const newComment = {
        //     cursor: data.createComment.id,
        //     node: { ...data.createComment, replies: 0 },
        //   };

        //   let newComments: GetPostCommentsOnCursorQuery;

        //   if (existingComments && existingComments.postCommentsOnCursor.total > 0) {
        //     newComments = produce(existingComments, (draft) => {
        //       draft.postCommentsOnCursor.edges = [
        //         newComment,
        //         ...draft.postCommentsOnCursor.edges,
        //       ];
        //       draft.postCommentsOnCursor.total += 1;
        //     });
        //   } else {
        //     newComments = {
        //       postCommentsOnCursor: {
        //         edges: [newComment],
        //         pageInfo: { hasNext: false },
        //         total: 1,
        //       },
        //     };
        //   }

        //   cache.writeQuery<GetPostCommentsOnCursorQuery>({
        //     query: GetPostCommentsOnCursorDocument,
        //     data: newComments,
        //     variables: { postId: postId as string, limit: 6 },
        //   });

        //   cache.writeQuery<GetPostCommentsCountQuery>({
        //     query: GetPostCommentsCountDocument,
        //     data: { postCommentsCount: newComments.postCommentsOnCursor.total },
        //     variables: { id: postId as string },
        //   });
        // },
      });
      setValue(initialValue);
      setExpand(false);
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
