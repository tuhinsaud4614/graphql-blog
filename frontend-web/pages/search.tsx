import { Tabs } from "@component";
import { NextPageWithLayout } from "@types";
import { SearchLayout } from "components/Layout";
import { RecentSearch, SearchAuthor, SearchPosts } from "components/search";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

const className = {
  title:
    "my-6 text-neutral/60 font-bold line-clamp-1 text-ellipsis md:leading-[3.25rem] text-xl md:text-[2.625rem]",
};

const tabs = ["posts", "author", "categories", "tags"];

interface Props {
  query: { [key: string]: any };
}

const Search: NextPageWithLayout<Props> = ({ query }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const { replace } = useRouter();

  useEffect(() => {
    if (query && "t" in query && query.t) {
      const tab = tabs.findIndex((t) => t === query.t);
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
    <SearchLayout sidebar={<Fragment />}>
      <h1 className={className.title}>
        Results for <span className="text-neutral">{query["q"]}</span>
      </h1>
      <Tabs
        tabs={tabs}
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
            linkText="Browse following author"
          />
        ) : (
          <Fragment />
        )}
        {currentTab === 1 ? (
          <SearchAuthor
            link={`/search?q=${query["q"]}&t=${tabs[currentTab + 1]}`}
            linkText="Browse following author"
          />
        ) : (
          <Fragment />
        )}
        <div>categories</div>
        <div>tags</div>
      </Tabs>
    </SearchLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { query } };
};

export default Search;
