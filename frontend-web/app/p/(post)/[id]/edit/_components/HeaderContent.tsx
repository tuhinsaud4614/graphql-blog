"use client";

import { useParams, useRouter } from "next/navigation";

import { toast } from "sonner";

import { ErrorModal } from "@/components";
import Button from "@/components/ui/Button";
import { usePublishPostMutation } from "@/graphql/generated/schema";
import useUser from "@/hooks/useUser";
import { ROUTES } from "@/lib/constants";
import { cn, getUserName, gplErrorHandler } from "@/lib/utils";

import { usePostDraftSavingState } from "../../../_hooks/usePost";

export default function HeaderContent() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { isSaving, isDrafted, setWantToPublish } = usePostDraftSavingState();
  const user = useUser();
  const username = user ? getUserName(user) : "";

  const [publishPost, { loading: publishLoading, reset, error }] =
    usePublishPostMutation({
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
    });

  const handlePublish = async () => {
    const postId = params?.id;
    if (!postId) {
      return;
    }

    const { data } = await publishPost({
      variables: {
        id: postId,
      },
      update(cache) {
        cache.evict({ fieldName: "post", args: { id: postId } });
        cache.gc();
      },
    });

    if (data?.publishPost) {
      toast.success(data.publishPost, {
        position: "top-center",
        duration: 2000,
        dismissible: true,
      });

      router.push(ROUTES.user.post(postId));
    }
  };

  const savingText = isSaving ? "Saving..." : isSaving === false ? "Saved" : "";

  return (
    <>
      <div className="flex w-full items-center justify-between">
        {!!username && (
          <span
            className={cn(
              "text-ellipsis whitespace-nowrap pr-2.5 font-title",
              isDrafted ? "text-xs" : "text-xl font-semibold",
            )}
          >
            {isDrafted ? `Draft in ${username}` : username}
          </span>
        )}
        {!!savingText && (
          <span className="dark:text-neutral-dark/50 text-xs text-neutral/50">
            {savingText}
          </span>
        )}
        {isDrafted && (
          <Button
            variant="accent"
            className="ml-auto px-2.5 py-1 text-xs"
            aria-label={
              isDrafted === "PUBLISHED_&_DRAFTED"
                ? "Save and Publish"
                : "Publish"
            }
            onClick={async () => {
              setWantToPublish?.(
                isDrafted === "PUBLISHED_&_DRAFTED"
                  ? "SAVE_AND_PUBLISH"
                  : "PUBLISH",
              );

              if (isDrafted === "PUBLISHED_&_DRAFTED") {
                await handlePublish();
              }
            }}
            type="button"
            disabled={isSaving || publishLoading}
            loading={publishLoading}
          >
            {isDrafted === "PUBLISHED_&_DRAFTED"
              ? "Save and Publish"
              : "Publish"}
          </Button>
        )}
      </div>
      <ErrorModal
        onClose={() => void reset()}
        title="Publishing post Errors"
        errors={gplErrorHandler(error)}
      />
    </>
  );
}
