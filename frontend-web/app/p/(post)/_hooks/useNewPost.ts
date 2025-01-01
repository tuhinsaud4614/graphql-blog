"use client";

import { useContextSelector } from "use-context-selector";

import { NewPostContext } from "../_context/new-post-context";

export function useNewPostState() {
  const { data, setData } = useContextSelector(NewPostContext, (state) => state);

  if (!setData) {
    throw new Error("useNewPostState must be used within the NewPostProvider");
  }

  return { data, setData };
}

export function useNewPostData() {
  const data = useContextSelector(NewPostContext, (state) => state.data);

  if (data === undefined) {
    throw new Error("useNewPostData must be used within the NewPostProvider");
  }

  return data;
}

export function useNewPostSetData() {
  const setData = useContextSelector(NewPostContext, (state) => state.setData);

  if (setData === undefined) {
    throw new Error(
      "useNewPostSetData must be used within the NewPostProvider",
    );
  }

  return setData;
}
