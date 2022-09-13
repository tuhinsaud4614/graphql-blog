import classNames from "classnames";
import { BottomSheet, Button, Menu, ToastErrorMessage } from "components";
import {
  FCommentWithRepliesFragment,
  FCommentWithRepliesFragmentDoc,
  GetPostCommentsCountDocument,
  GetPostCommentsCountQuery,
  GetPostCommentsOnCursorDocument,
  GetPostCommentsOnCursorQuery,
  useDeleteCommentMutation,
} from "graphql/generated/schema";
import produce from "immer";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { FiEdit2, FiMoreVertical, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { gplErrorHandler, isDev } from "utils";
import { useEditorOpener } from "./context";

const className = {
  root: "p-1 outline-none border-none text-accent dark:text-accent-dark hover:bg-base-200 dark:hover:bg-base-dark-300 hover:text-accent-focus dark:hover:text-accent active:scale-95 rounded-full",
  items: "list-none m-0 flex flex-col min-w-[7.5rem]",
  btn: "w-full outline-none border-none flex items-center px-2 py-1.5 text-sm hover:bg-base-200 dark:hover:bg-base-dark-100  text-neutral dark:text-neutral-dark hover:text-accent dark:hover:text-accent-dark active:scale-95",
  deleteBody: "flex items-center justify-center z-[1001]",
  deleteContent: "flex flex-col items-center justify-center p-[3.125rem]",
  deleteTitle:
    "font-medium text-neutral dark:text-neutral-dark text-[1.375rem] leading-7",
  deleteActions: "flex justify-center mx-auto",
  deleteInfo: "text-sm text-neutral dark:text-neutral-dark text-center",
};

interface Props {
  commentId: string;
  replyFor?: string;
}

export default function MoreButton({ commentId, replyFor }: Props) {
  const {
    query: { postId },
  } = useRouter();
  const [anchorEle, setAnchorEle] = useState<null | HTMLButtonElement>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const opener = useEditorOpener();

  const [deleteComment, { loading, error, client }] = useDeleteCommentMutation({
    notifyOnNetworkStatusChange: true,
  });

  const submitHandler = async () => {
    try {
      const { data } = await deleteComment({
        variables: {
          commentId,
        },
        update(cache, { data }) {
          if (!data) {
            return;
          }
          try {
            cache.updateQuery<GetPostCommentsOnCursorQuery>(
              {
                query: GetPostCommentsOnCursorDocument,
                variables: {
                  postId: postId as string,
                  limit: 6,
                  parentId: replyFor,
                },
              },
              (prevComments) => {
                if (
                  !prevComments ||
                  prevComments.postCommentsOnCursor.total === 0
                ) {
                  return;
                }
                const newComments = produce(prevComments, (draft) => {
                  draft.postCommentsOnCursor.edges =
                    draft.postCommentsOnCursor.edges.filter(
                      (comment) => comment.cursor !== data.deleteComment
                    );
                  draft.postCommentsOnCursor.total -= 1;
                });
                return newComments;
              }
            );
            if (replyFor) {
              cache.updateFragment<FCommentWithRepliesFragment>(
                {
                  fragment: FCommentWithRepliesFragmentDoc,
                  fragmentName: "FCommentWithReplies",
                  id: `Comment:${replyFor}`,
                },
                (prevFrag) => {
                  return prevFrag
                    ? { ...prevFrag, replies: prevFrag.replies - 1 }
                    : undefined;
                }
              );
            } else {
              cache.updateQuery<GetPostCommentsCountQuery>(
                {
                  query: GetPostCommentsCountDocument,
                  variables: { id: postId as string },
                },
                (prevCount) => {
                  return prevCount && prevCount.postCommentsCount > 0
                    ? {
                        postCommentsCount: prevCount.postCommentsCount - 1,
                      }
                    : undefined;
                }
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
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
        });
      }

      setConfirmDelete(false);
    } catch (error) {}
  };

  useEffect(() => {
    const tempErrors = gplErrorHandler(error);
    if (tempErrors) {
      toast.error(<ToastErrorMessage error={tempErrors} />, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  }, [error]);

  return (
    <Fragment>
      <button
        type="button"
        aria-label="More"
        className={className.root}
        onClick={(e) => {
          setAnchorEle(e.currentTarget);
        }}
      >
        <FiMoreVertical size={20} />
      </button>
      <Menu
        open={Boolean(anchorEle)}
        anchorEle={anchorEle}
        onClose={() => setAnchorEle(null)}
        hideArrow
      >
        <ul className={className.items}>
          <li>
            <button
              type="button"
              aria-label="Edit"
              className={className.btn}
              onClick={() => {
                setAnchorEle(null);
                opener();
              }}
            >
              <FiEdit2 size={18} />
              <span className="ml-2">Edit</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              aria-label="Delete"
              className={className.btn}
              onClick={() => {
                setAnchorEle(null);
                setConfirmDelete(true);
              }}
            >
              <FiTrash2 size={18} />
              <span className="ml-2">Delete</span>
            </button>
          </li>
        </ul>
      </Menu>
      <BottomSheet
        open={confirmDelete}
        classes={{
          container: className.deleteBody,
          backdrop: "z-[1000] !opacity-0",
        }}
      >
        <div className={className.deleteContent}>
          <h2 className={className.deleteTitle}>Delete</h2>
          <p className={classNames(className.deleteInfo, "mt-2.5")}>
            Deleted responses are gone forever.
          </p>
          <p className={classNames(className.deleteInfo, "mb-10")}>
            Are you sure?
          </p>
          <div className={className.deleteActions}>
            <Button
              type="button"
              aria-label="Cancel"
              variant="neutral"
              mode="text"
              className="!rounded-full text-sm mr-2 !px-4 !py-2"
              onClick={() => setConfirmDelete(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              type="button"
              aria-label="Delete Comment"
              variant="error"
              className="text-sm !px-4 !py-2"
              onClick={submitHandler}
              loading={loading}
              disabled={loading}
            >
              Delete Comment
            </Button>
          </div>
        </div>
      </BottomSheet>
    </Fragment>
  );
}
