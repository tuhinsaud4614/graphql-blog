"use client";

import { useContextSelector } from "use-context-selector";

import { PostDraftSettings } from "../_context/post-context";

export function usePostDraftSavingState() {
  const {
    isSaving,
    setIsSaving,
    isDrafted,
    setIsDrafted,
    setWantToPublish,
    wantToPublish,
  } = useContextSelector(PostDraftSettings, (state) => state);

  if (!setIsSaving) {
    throw new Error(
      "usePostDraftSaving must be used within the PostContextProvider",
    );
  }

  return {
    isSaving,
    setIsSaving,
    isDrafted,
    setIsDrafted,
    wantToPublish,
    setWantToPublish,
  };
}

export function usePostDraftIsSaving() {
  const isSaving = useContextSelector(
    PostDraftSettings,
    (state) => state.isSaving,
  );

  return isSaving;
}

export function usePostDraftSetSaving() {
  const setIsSaving = useContextSelector(
    PostDraftSettings,
    (state) => state.setIsSaving,
  );

  if (setIsSaving === undefined) {
    throw new Error(
      "usePostDraftSetSaving must be used within the PostContextProvider",
    );
  }

  return setIsSaving;
}

export function usePostWantToPublish() {
  const wantToPublish = useContextSelector(
    PostDraftSettings,
    (state) => state.wantToPublish,
  );

  return wantToPublish;
}

export function usePostSetWantToPublish() {
  const setWantToPublish = useContextSelector(
    PostDraftSettings,
    (state) => state.setWantToPublish,
  );

  if (setWantToPublish === undefined) {
    throw new Error(
      "usePostSetWantToPublish must be used within the PostContextProvider",
    );
  }

  return setWantToPublish;
}
export function usePostIsDrafted() {
  const isDrafted = useContextSelector(
    PostDraftSettings,
    (state) => state.isDrafted,
  );

  return isDrafted;
}

export function usePostSetIsDrafted() {
  const setIsDrafted = useContextSelector(
    PostDraftSettings,
    (state) => state.setIsDrafted,
  );

  if (setIsDrafted === undefined) {
    throw new Error(
      "usePostSetIsDrafted must be used within the PostContextProvider",
    );
  }

  return setIsDrafted;
}
