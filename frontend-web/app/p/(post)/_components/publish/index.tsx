"use client";

import * as React from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { XIcon } from "lucide-react";
import { toast } from "sonner";

import { Button, ErrorModal, LinkTextButton, Modal } from "@/components";
import Input from "@/components/ui/Input";
import {
  GetPostItemFragment,
  usePublishPostMutation,
} from "@/graphql/generated/schema";
import useUser from "@/hooks/useUser";
import { BACKEND_API_URL, ROUTES } from "@/lib/constants";
import {
  cn,
  getImageFromEditorJsBlocks,
  getPostTitleFromDraft,
  getUserName,
  gplErrorHandler,
} from "@/lib/utils";

import { usePostDraftSavingState } from "../../_hooks/usePost";
import CategoriesSuggestion from "./CategoriesSuggestion";
import TagsSuggestion from "./TagsSuggestion";

interface Props {
  post: GetPostItemFragment;
}

export default function PublishPost({ post }: Readonly<Props>) {
  const [categories, setCategories] = React.useState<
    { name: string; value: string }[]
  >([]);
  const [tags, setTags] = React.useState<{ name: string; value: string }[]>([]);
  const [title, setTitle] = React.useState(
    getPostTitleFromDraft(post.draft) ?? "",
  );
  const [imageUrl, _] = React.useState(
    getImageFromEditorJsBlocks(post.draft) ?? "",
  );

  const { setWantToPublish, wantToPublish } = usePostDraftSavingState();
  const user = useUser();
  const username = user ? getUserName(user) : "";
  const router = useRouter();

  const [publishPost, { loading: publishLoading, reset, error }] =
    usePublishPostMutation({
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
    });

  if (wantToPublish === "PUBLISH") {
    const imageBaseUrl = BACKEND_API_URL;

    const closeHandler = () => {
      setWantToPublish?.(undefined);
    };

    const handlePublish = async () => {
      const { data } = await publishPost({
        variables: {
          id: post.id,
          title,
          categories:
            categories.length > 0
              ? categories.map((category) => category.value)
              : undefined,
          tags: tags.length > 0 ? tags.map((tag) => tag.value) : undefined,
          imageUrl:
            imageUrl && imageBaseUrl && imageUrl.startsWith(imageBaseUrl)
              ? imageUrl.split(imageBaseUrl + "/")[1]
              : undefined,
        },
      });

      if (data?.publishPost) {
        toast.success(data.publishPost, {
          position: "top-center",
          duration: 2000,
          dismissible: true,
        });

        closeHandler();
        router.push(ROUTES.user.post(post.id));
      }
    };

    return (
      <>
        <Modal
          open={true}
          locked={true}
          classes={{
            container:
              "sm:max-w-5xl h-[100dvh] max-h-[100dvh] w-screen sm:max-w-full rounded-none items-center justify-center",
          }}
        >
          <div className="relative flex max-w-screen-lg flex-col items-start justify-center lg:flex-row">
            <Button
              variant="error"
              type="button"
              mode="text"
              className="absolute bottom-full right-0 z-10 p-4 hover:bg-transparent"
              aria-label="Close"
              onClick={closeHandler}
            >
              <XIcon />
            </Button>
            <div className="p-4 sm:p-6">
              <p className="mb-3 font-title font-normal text-neutral">
                <b>Story Preview</b>
              </p>
              <div
                className={cn(
                  "relative flex h-[12.5rem] overflow-hidden rounded-lg",
                  !imageUrl && "items-center justify-center bg-muted",
                )}
              >
                {imageUrl ? (
                  <Image
                    src={
                      imageUrl.startsWith("https://") ||
                      imageUrl.startsWith("http://")
                        ? imageUrl
                        : `${imageBaseUrl ?? ""}/${imageUrl}`
                    }
                    alt={title || "Untitled"}
                    className="h-[12.5rem]"
                    fill
                  />
                ) : (
                  <span className="tex-xs text-muted-foreground">
                    Include a high-quality image in your post to make it more
                    inviting to readers.
                  </span>
                )}
              </div>
              <Input
                placeholder="Write a preview title"
                className="text-start"
                classes={{ root: "my-3" }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <CategoriesSuggestion
                categories={categories}
                setCategories={setCategories}
              />
              <TagsSuggestion setTags={setTags} tags={tags} />
              <p className="dark:text-neutral-dark/50 text-sm text-neutral/50">
                <b>Note:</b> Changes here will affect how your post appears in
                public places like homepage and in subscribers’ inboxes — not
                the contents of the post itself.
              </p>
            </div>
            <div className="p-4 sm:p-6">
              <p className="mb-3 font-title font-normal text-neutral">
                Publishing to: <b>{username}</b>
              </p>
              <div className="dark:text-neutral-dark/50 mt-6 text-sm text-neutral/50">
                <LinkTextButton href="#" target="_blank" className="text-sm">
                  Learn more
                </LinkTextButton>{" "}
                about what happens to your post when you publish.
              </div>
              <Button
                aria-label="Publish now"
                className="mt-6"
                type="button"
                onClick={handlePublish}
                loading={publishLoading}
                disabled={publishLoading}
              >
                Publish now
              </Button>
            </div>
          </div>
        </Modal>
        <ErrorModal
          onClose={() => void reset()}
          title="Publishing post Errors"
          errors={gplErrorHandler(error)}
        />
      </>
    );
  }
  return null;
}
