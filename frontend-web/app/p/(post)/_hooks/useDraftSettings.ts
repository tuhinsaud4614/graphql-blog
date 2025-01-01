"use client";

import { useContextSelector } from "use-context-selector";

import { NewPostDraftSettings } from "../_context/new-post-context";

export function useDraftSettings() {
  const { isLoading,setIsLoading } = useContextSelector(NewPostDraftSettings, (state) => state);

  if (!setIsLoading) {
    throw new Error("useDraftSettings must be used within the NewPostProvider");
  }

  return { isLoading,setIsLoading };
}

export function useDraftSettingsLoading() {
  const isLoading = useContextSelector(NewPostDraftSettings, (state) => state.isLoading);

  if (isLoading === undefined) {
    throw new Error("useDraftSettings must be used within the NewPostProvider");
  }

  return isLoading;
}
