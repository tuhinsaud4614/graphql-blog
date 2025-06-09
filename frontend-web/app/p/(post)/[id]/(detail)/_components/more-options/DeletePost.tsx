"use client";

import * as React from "react";

import { Button, Modal, ModalHeader, ToastErrorMessage } from "@/components";
import { FCommentWithRepliesFragment, FCommentWithRepliesFragmentDoc, GetPostCommentsCountDocument, GetPostCommentsCountQuery, GetPostCommentsWithCursorDocument, GetPostCommentsWithCursorQuery, useDeletePostMutation } from "@/graphql/generated/schema";
import { isDev } from "@/lib/isType";
import { gplErrorHandler } from "@/lib/utils";
import { produce } from "immer";
import { toast } from "sonner";

const className = {
  root: "flex flex-col",
  title:
    "font-bold line-clamp-2 text-ellipsis text-neutral dark:text-neutral-dark inline-block",
  body: "line-clamp-2 leading-5 text-ellipsis text-neutral/50 dark:text-neutral-dark/50 inline-block mt-1",
  other:
    "flex items-center pt-2 text-sm text-neutral/70 dark:text-neutral-dark/70",
  moreBtn: "ml-2 border-none outline-none active:scale-95 hover:text-accent",
  actions: "w-32 flex flex-col py-2",
  actionsBtn: "outline-none border-none px-5 py-2 text-sm active:scale-95",
  modalBody: "px-14 pb-11 flex flex-col justify-center items-center",
  modalBodyTitle:
    "font-medium text-[1.375rem] md:text-[1.875rem] leading-7 md:leading-9 text-neutral dark:text-neutral-dark",
  modalBodyText:
    "pt-1.5 pb-9 text-sm md:text-base text-neutral/60 dark:text-neutral-dark/60 text-center",
};

interface Props {
  postId: string;
  openModel: boolean;
  setOpenModel: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeletePost({
  postId,
  openModel,
  setOpenModel,
}: Readonly<Props>) {
  const [deletePost, { loading, error }] = useDeletePostMutation({
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    fetchPolicy: "network-only",
  });

  const submitHandler = async () => {
    try {
      const { data } = await deletePost({
        variables: {
          id: postId,
        },
        update(cache, { data }) {
          if (!data) {
            return;
          }
          try {
            cache.updateQuery<GetPostCommentsWithCursorQuery>(
              {
                query: GetPostCommentsWithCursorDocument,
                variables: {
                  postId: postId,
                  limit: 6,
                  parentId: replyFor,
                },
              },
              (prevComments) => {
                if (
                  !prevComments ||
                  prevComments.postCommentsWithCursor.total === 0
                ) {
                  return;
                }
                const newComments = produce(prevComments, (draft) => {
                  const secondLastComment =
                    draft.postCommentsWithCursor.edges[
                      draft.postCommentsWithCursor.edges.length - 2
                    ];
                  draft.postCommentsWithCursor.edges =
                    draft.postCommentsWithCursor.edges.filter((comment) => {
                      if (comment.cursor === data.deleteComment) {
                        if (
                          secondLastComment &&
                          draft.postCommentsWithCursor.pageInfo.endCursor ===
                            data.deleteComment
                        ) {
                          draft.postCommentsWithCursor.pageInfo.endCursor =
                            secondLastComment.cursor;
                        }
                        return false;
                      }
                      return true;
                    });
                  draft.postCommentsWithCursor.total -= 1;
                });
                return newComments;
              },
            );
            if (replyFor) {
              cache.updateFragment<FCommentWithRepliesFragment>(
                {
                  fragment: FCommentWithRepliesFragmentDoc,
                  fragmentName: "FCommentWithReplies",
                  id: `Comment:${replyFor}`,
                },
                (prevFrag: FCommentWithRepliesFragment | null) => {
                  return prevFrag
                    ? { ...prevFrag, replies: prevFrag.replies - 1 }
                    : undefined;
                },
              );
            } else {
              cache.updateQuery<GetPostCommentsCountQuery>(
                {
                  query: GetPostCommentsCountDocument,
                  variables: { id: postId },
                },
                (prevCount) => {
                  return prevCount && prevCount.postCommentsCount > 0
                    ? {
                        postCommentsCount: prevCount.postCommentsCount - 1,
                      }
                    : undefined;
                },
              );
            }
          } catch (error) {
            isDev() && console.log(error);
          }
        },
      });

      if (data) {
        toast.success("Comment deleted successfully!", {
          position: "top-center",
        });
      }

      setConfirmDelete(false);
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
    <Modal
      open={openModel}
      onHide={() => {
        setOpenModel(false);
      }}
    >
      <ModalHeader
        onClose={() => setOpenModel(false)}
        className="border-none"
      />
      <div className="flex flex-col items-center justify-center px-14 pb-11">
        <h2 className="dark:text-neutral-dark text-[1.375rem] font-medium leading-7 text-neutral md:text-[1.875rem] md:leading-9">
          Delete post
        </h2>
        <p className="dark:text-neutral-dark/60 pb-9 pt-1.5 text-center text-sm text-neutral/60 md:text-base">
          Are you sure you want to delete this post? Deletion is not reversible,
          and the story will be completely deleted
        </p>
        <div className="flex items-center">
          <Button
            aria-label="Cancel"
            type="button"
            onClick={() => setOpenModel(false)}
            className="mr-2 !px-4 !py-1.5 text-sm"
            variant="neutral"
            mode="outline"
          >
            Cancel
          </Button>
          <Button
            aria-label="Delete"
            type="button"
            onClick={() => {}}
            className="!px-4 !py-1.5 text-sm"
            variant="error"
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
