"use client";

import * as React from "react";

import { OutputData } from "@editorjs/editorjs";
import { toast } from "sonner";
import { useDebounceCallback } from "usehooks-ts";

import { NotFoundMessage, ToastErrorMessage } from "@/components";
import Editor from "@/components/editor";
import {
  GetPostItemFragment,
  useUpdatePostDraftMutation,
} from "@/graphql/generated/schema";
import { ROUTES } from "@/lib/constants";
import { gplErrorHandler } from "@/lib/utils";

import {
  DraftSettings,
  usePostDraftSettings,
} from "../../_context/post-context";
import PublishPost from "../publish";

interface Props {
  post?: GetPostItemFragment;
}

export default function PostForm({ post }: Readonly<Props>) {
  const [draft, setDraft] = React.useState<OutputData | null>(
    post?.draft || post?.content,
  );
  const {
    setIsSaving: setDraftSaving,
    setIsDrafted,
    wantToPublish,
    setWantToPublish,
  } = usePostDraftSettings((state) => state);
  const [updateDraft] = useUpdatePostDraftMutation({
    notifyOnNetworkStatusChange: true,
    onError(error) {
      const tempErrors = gplErrorHandler(error);
      if (tempErrors) {
        toast.error(<ToastErrorMessage error={tempErrors} />, {
          position: "bottom-right",
        });
      }
    },
  });

  const isAlreadyPublished = post?.content && post.content.blocks.length > 0;

  React.useEffect(() => {
    if (isAlreadyPublished) {
      setWantToPublish?.("SAVE_AND_PUBLISH");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAlreadyPublished]);

  const debounced = useDebounceCallback(
    async (postId: string, draft: OutputData | null) => {
      if (draft) {
        // Update the post object so that we can use it to save
        setDraft(draft);
        setDraftSaving?.(true);
        await updateDraft({ variables: { draft, postId } });
        if (draft && draft.blocks.length > 0) {
          if (isAlreadyPublished) {
            setIsDrafted?.("PUBLISHED_&_DRAFTED");
          } else {
            setIsDrafted?.("DRAFT_ONLY");
          }
        }
        setDraftSaving?.(false);
      }
    },
    500,
  );

  if (!post) {
    return (
      <NotFoundMessage
        goto={ROUTES.user.home}
        gotoText="Go to Home"
        title="Post not found to edit"
      />
    );
  }

  return (
    <>
      {!!post && <CheckIsDrafted post={post} />}
      {!!post && wantToPublish === "PUBLISH" && (
        <PublishPost post={{ ...post, draft }} />
      )}
      <Editor
        value={post.draft || post.content}
        placeholder="What's on your mind?"
        className="post-editor font-body [--title-placeholder:'Title']"
        onValueChange={async (value) => await debounced(post.id, value)}
      />
    </>
  );
}

function CheckIsDrafted({ post }: Readonly<{ post: GetPostItemFragment }>) {
  const setIsDrafted = usePostDraftSettings((state) => state.setIsDrafted);
  let isDrafted: DraftSettings["isDrafted"] = undefined;

  if (post.draft && post.draft.blocks.length > 0 && !post.content) {
    isDrafted = "DRAFT_ONLY";
  } else if (post.content && post.draft && post.draft.blocks.length > 0) {
    isDrafted = "PUBLISHED_&_DRAFTED";
  }

  React.useEffect(() => {
    setIsDrafted?.(isDrafted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
