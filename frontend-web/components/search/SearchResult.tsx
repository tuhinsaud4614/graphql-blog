import * as React from "react";

import { useRouter } from "next/router";

import { SearchBox, Tabs } from "@/components";
import { SearchLayout } from "@/components/Layout";
import { useLocalStorage } from "@/hooks";
import { queryChecking } from "@/utils";
import { RECENT_SEARCHES_KEY, SEARCH_TABS } from "@/utils/constants";

import {
  SearchAuthor,
  SearchCategories,
  SearchPosts,
  SearchPostsSidebarContent,
  SearchTags,
} from ".";

const className = {
  title:
    "my-6 text-neutral/60 dark:text-neutral-dark/60 font-bold line-clamp-1 text-ellipsis md:leading-[3.25rem] text-xl md:text-[2.625rem]",
};

interface Props {
  query: {
    [key: string]: any;
  };
}

export default function SearchResult({ query }: Props) {
  const [currentTab, setCurrentTab] = React.useState(() =>
    queryChecking(query, SEARCH_TABS, "t"),
  );
  const [_, setRecentSearches] = useLocalStorage<string[] | null>(
    RECENT_SEARCHES_KEY,
    null,
  );
  const searchRef = React.useRef<null | HTMLDivElement>(null);
  const inputRef = React.useRef<null | HTMLInputElement>(null);
  const { replace } = useRouter();

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      if (inputRef.current.value.trim()) {
        setRecentSearches((prev) => {
          if (inputRef.current) {
            return prev
              ? [...prev, inputRef.current.value]
              : [inputRef.current?.value];
          }
          return prev;
        });
      }
      replace(
        `/search?q=${inputRef.current.value}${
          currentTab === 0 ? "" : "&t=" + SEARCH_TABS[currentTab]
        }`,
      );
    }
  };

  React.useEffect(() => {
    setCurrentTab(queryChecking(query, SEARCH_TABS, "t"));
  }, [query]);
  return (
    <SearchLayout
      sidebar={
        <SearchPostsSidebarContent
          hide={SEARCH_TABS[currentTab]}
          query={query["q"]}
        />
      }
    >
      <SearchBox
        ref={inputRef}
        rootRef={searchRef}
        onKeyDown={keyDownHandler}
        classes={{ root: "lg:hidden" }}
      />
      <h1 className={className.title}>
        Results for{" "}
        <span className="text-neutral dark:text-neutral-dark">
          {query["q"]}
        </span>
      </h1>
      <Tabs
        tabs={SEARCH_TABS}
        onTab={(index, key) => {
          replace(
            index !== 0
              ? `/search?q=${query["q"]}&t=${key}`
              : `/search?q=${query["q"]}`,
          );
        }}
        selectedTab={currentTab}
      >
        {currentTab === 0 ? (
          <SearchPosts
            link={`/search?q=${query["q"]}`}
            linkText="Browse searched author"
          />
        ) : (
          <React.Fragment />
        )}
        {currentTab === 1 ? (
          <SearchAuthor
            link={`/search?q=${query["q"]}&t=${SEARCH_TABS[2]}`}
            linkText="Browse searched categories"
          />
        ) : (
          <React.Fragment />
        )}
        {currentTab === 2 ? (
          <SearchCategories
            link={`/search?q=${query["q"]}&t=${SEARCH_TABS[3]}`}
            linkText="Browse searched tags"
          />
        ) : (
          <React.Fragment />
        )}
        {currentTab === 3 ? (
          <SearchTags
            link={`/search?q=${query["q"]}&t=${SEARCH_TABS[0]}`}
            linkText="Browse searched posts"
          />
        ) : (
          <React.Fragment />
        )}
      </Tabs>
    </SearchLayout>
  );
}
