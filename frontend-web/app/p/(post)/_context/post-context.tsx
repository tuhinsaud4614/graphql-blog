"use client";

import * as React from "react";

import { createContext, useContextSelector } from "use-context-selector";

export interface DraftSettings {
  isSaving?: boolean;
  setIsSaving?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  isDrafted?: "DRAFT_ONLY" | "PUBLISHED_&_DRAFTED";
  setIsDrafted?: React.Dispatch<
    React.SetStateAction<"DRAFT_ONLY" | "PUBLISHED_&_DRAFTED" | undefined>
  >;
  wantToPublish?: "SAVE_AND_PUBLISH" | "PUBLISH";
  setWantToPublish?: React.Dispatch<
    React.SetStateAction<"SAVE_AND_PUBLISH" | "PUBLISH" | undefined>
  >;
}

export const PostDraftSettings = createContext<DraftSettings>({
  isSaving: undefined,
});

export default function PostContextProvider({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  const [isSaving, setIsSaving] =
    React.useState<DraftSettings["isSaving"]>(undefined);
  const [isDrafted, setIsDrafted] =
    React.useState<DraftSettings["isDrafted"]>(undefined);
  const [wantToPublish, setWantToPublish] =
    React.useState<DraftSettings["wantToPublish"]>(undefined);

  const memoSettings = React.useMemo(
    () => ({
      isSaving,
      setIsSaving,
      isDrafted,
      setIsDrafted,
      wantToPublish,
      setWantToPublish,
    }),
    [isDrafted, isSaving, wantToPublish],
  );

  return (
    <PostDraftSettings.Provider value={memoSettings}>
      {children}
    </PostDraftSettings.Provider>
  );
}

export function usePostDraftSettings<T>(selector: (state: DraftSettings) => T) {
  return useContextSelector(PostDraftSettings, (ctx) => {
    if (!ctx) throw new Error("PostDraftSettings is not available.");
    return selector(ctx);
  });
}
