"use client";

import * as React from "react";

import { useParams, useRouter } from "next/navigation";

import { LoaderIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { ToastErrorMessage } from "@/components";
import Button from "@/components/ui/Button";
import { useCreateUntitledPostMutation } from "@/graphql/generated/schema";
import useUser from "@/hooks/useUser";
import { ROUTES } from "@/lib/constants";
import { gplErrorHandler } from "@/lib/utils";

type CreatePostTitleProps = {
  children?: React.ReactElement<{
    onClick?: () => Promise<void>;
    disabled?: boolean;
  }>;
  onSuccess?: () => void;
};

export default function CreatePostTitle({
  children,
  onSuccess,
}: CreatePostTitleProps) {
  const user = useUser();
  const params = useParams<{ authorId: string }>();
  const router = useRouter();

  const [createUntitledPost, { loading }] = useCreateUntitledPostMutation({
    notifyOnNetworkStatusChange: true,
    onError(error) {
      const tempErrors = gplErrorHandler(error);
      if (tempErrors) {
        toast.error(<ToastErrorMessage error={tempErrors} />, {
          position: "bottom-right",
        });
      }
    },
    onCompleted(data) {
      router.refresh();
      router.push(ROUTES.user.editPost(data.createUntitledPost.id));
      onSuccess?.();
    },
  });

  async function onClick() {
    await createUntitledPost();
  }

  if (children) {
    return React.cloneElement(children, {
      onClick,
      disabled: loading,
    });
  }

  if (user?.id !== params?.authorId) {
    return null;
  }

  return (
    <Button
      className="ml-auto text-sm"
      onClick={onClick}
      disabled={loading}
      aria-label="Create new post"
    >
      {loading ? (
        <LoaderIcon className="mr-2 size-4 animate-spin" />
      ) : (
        <PlusIcon className="mr-2 size-4" />
      )}
      New post
    </Button>
  );
}
