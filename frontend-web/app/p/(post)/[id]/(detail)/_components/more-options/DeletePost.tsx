"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button, Modal, ModalHeader, ToastErrorMessage } from "@/components";
import { useDeletePostMutation } from "@/graphql/generated/schema";
import useUser from "@/hooks/useUser";
import { clearCacheAfterDeletePost } from "@/lib/cache-utils";
import { ROUTES } from "@/lib/constants";
import { isDev } from "@/lib/isType";
import { gplErrorHandler } from "@/lib/utils";

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
  const router = useRouter();
  const authUser = useUser();
  const [deletePost, { loading, error }] = useDeletePostMutation({
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    fetchPolicy: "network-only",
  });

  const submitHandler = async () => {
    if (!authUser) {
      return;
    }
    try {
      const { data } = await deletePost({
        variables: {
          id: postId,
        },
        update(cache, { data }) {
          if (!data) {
            return;
          }
          clearCacheAfterDeletePost(cache, authUser.id, postId);
        },
      });

      if (data) {
        toast.success("Comment deleted successfully!", {
          position: "top-center",
        });
      }

      setOpenModel(false);
      router.replace(ROUTES.user.userProfile(authUser.id));
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
            onClick={submitHandler}
            className="!px-4 !py-1.5 text-sm"
            variant="error"
            loading={loading}
            disabled={loading}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
