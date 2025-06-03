"use client";

import Button from "@/components/ui/Button";
import useUser from "@/hooks/useUser";
import { cn, getUserName } from "@/lib/utils";

import { usePostDraftSavingState } from "../../../_hooks/usePost";

export default function HeaderContent() {
  const { isSaving, isDrafted, setWantToPublish } = usePostDraftSavingState();
  const user = useUser();
  const username = user ? getUserName(user) : "";
  const savingText = isSaving ? "Saving..." : isSaving === false ? "Saved" : "";

  return (
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
            isDrafted === "PUBLISHED_&_DRAFTED" ? "Save and Publish" : "Publish"
          }
          onClick={() => {
            setWantToPublish?.(
              isDrafted === "PUBLISHED_&_DRAFTED"
                ? "SAVE_AND_PUBLISH"
                : "PUBLISH",
            );
          }}
          type="button"
          disabled={isSaving}
        >
          {isDrafted === "PUBLISHED_&_DRAFTED" ? "Save and Publish" : "Publish"}
        </Button>
      )}
    </div>
  );
}
