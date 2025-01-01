"use client";

import * as React from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { createContext } from "use-context-selector";
import { useDebounceCallback, useLocalStorage } from "usehooks-ts";

import { EditorData } from "@/components/editor";
import useSetQueryOnPage from "@/hooks/useSetQueryOnPage";
import dexieDB from "@/lib/dexie-db";
import { NEW_POST_DRAFT } from "@/lib/keys";

export interface State {
  data: EditorData | null;
  setData?: React.Dispatch<React.SetStateAction<EditorData | null>>;
}

export interface DraftSettings {
  isLoading: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewPostContext = createContext<State>({ data: null });
export const NewPostDraftSettings = createContext<DraftSettings>({
  isLoading: false,
});

export default function NewPostContextProvider({
  children,
  defaultData = null,
}: Readonly<{
  defaultData?: EditorData | null;
  children?: React.ReactNode;
}>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setQueryString = useSetQueryOnPage(pathname ?? "");

  const postId = searchParams?.get("postId");
  const [data, setData] = useLocalStorage<EditorData | null>(
    NEW_POST_DRAFT,
    defaultData,
  );
  const [isLoading, setLoading] =
    React.useState<DraftSettings["isLoading"]>(false);

  // Memoize the value to avoid unnecessary re-renders
  const memoState = React.useMemo(() => ({ data, setData }), [data, setData]);
  const memoSettings = React.useMemo(
    () => ({ isLoading, setLoading }),
    [isLoading],
  );

  // const draftIt = async (data: EditorData | null) => {
  //   try {
  //     if (!data) {
  //       return;
  //     }
  //     let id = 1;
  //     setLoading(true);
  //     id = await dexieDB.posts.put({
  //       id: postId && Number.isInteger(+postId) && +postId > 0 ? +postId : 1,
  //       content: data ? JSON.stringify(data) : "",
  //     });
  //     typeof window !== "undefined" &&
  //       window.localStorage.removeItem(NEW_POST_DRAFT);
  //     if (!postId || !Number.isInteger(+postId) || +postId < 1) {
  //       console.log("id", id);
  //       setLoading(false);
  //       // id && router.replace(setQueryString({ postId: id.toString() }));
  //       // id && router.replace(`/p/${id}/edit`);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const debounced = useDebounceCallback(draftIt, 500);

  // React.useEffect(() => {
  //   void (async () => await debounced(data))();
  // }, [data, debounced]);

  // console.log(isLoading);

  return (
    <NewPostContext.Provider value={memoState}>
      <NewPostDraftSettings.Provider value={memoSettings}>
        {children}
      </NewPostDraftSettings.Provider>
    </NewPostContext.Provider>
  );
}
