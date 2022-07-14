import { SearchBox, Tabs } from "@component";
import { useLocalStorage, useMediaQuery } from "@hooks";
import { NextPageWithLayout } from "@types";
import { SearchLayout } from "components/Layout";
import {
  RecentSearch,
  SearchAuthor,
  SearchCategories,
  SearchPosts,
  SearchPostsSidebarContent,
  SearchTags,
} from "components/search";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Fragment, KeyboardEvent, useEffect, useRef, useState } from "react";
import { RECENT_SEARCHES, SEARCH_TABS } from "utils/constants";

const className = {
  title:
    "my-6 text-neutral/60 font-bold line-clamp-1 text-ellipsis md:leading-[3.25rem] text-xl md:text-[2.625rem]",
};

interface Props {
  query: { [key: string]: any };
}

const SearchPage: NextPageWithLayout<Props> = ({ query }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [_, setRecentSearches] = useLocalStorage<string[] | null>(
    RECENT_SEARCHES,
    null
  );
  const searchRef = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const { replace } = useRouter();
  const matches = useMediaQuery("(min-width: 1024px)");

  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
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
        }`
      );
    }
  };

  useEffect(() => {
    if (query && "t" in query && query.t) {
      const tab = SEARCH_TABS.findIndex((t) => t === query.t);
      setCurrentTab(tab === -1 ? 0 : tab);
    } else {
      setCurrentTab(0);
    }
  }, [query]);

  if (!("q" in query) || query.q === "") {
    return (
      <SearchLayout sidebar={<Fragment />}>
        <RecentSearch />
      </SearchLayout>
    );
  }

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
        Results for <span className="text-neutral">{query["q"]}</span>
      </h1>
      <Tabs
        tabs={[...SEARCH_TABS]}
        onTab={(index, key) => {
          replace(
            index !== 0
              ? `/search?q=${query["q"]}&t=${key}`
              : `/search?q=${query["q"]}`
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
          <Fragment />
        )}
        {currentTab === 1 ? (
          <SearchAuthor
            link={`/search?q=${query["q"]}&t=${SEARCH_TABS[2]}`}
            linkText="Browse searched categories"
          />
        ) : (
          <Fragment />
        )}
        {currentTab === 2 ? (
          <SearchCategories
            link={`/search?q=${query["q"]}&t=${SEARCH_TABS[3]}`}
            linkText="Browse searched tags"
          />
        ) : (
          <Fragment />
        )}
        {currentTab === 3 ? (
          <SearchTags
            link={`/search?q=${query["q"]}&t=${SEARCH_TABS[0]}`}
            linkText="Browse searched posts"
          />
        ) : (
          <Fragment />
        )}
      </Tabs>
    </SearchLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { query } };
};

export default SearchPage;
