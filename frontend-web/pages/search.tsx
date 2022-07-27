import { NextPageWithLayout } from "@types";
import { RecentSearch, SearchResult } from "components/search";
import { GetServerSideProps } from "next";

const className = {
  title:
    "my-6 text-neutral/60 dark:text-neutral-dark/60 font-bold line-clamp-1 text-ellipsis md:leading-[3.25rem] text-xl md:text-[2.625rem]",
};

interface Props {
  query: { [key: string]: any };
}

const SearchPage: NextPageWithLayout<Props> = ({ query }) => {
  if ("q" in query && query.q !== "") {
    return <SearchResult query={query} />;
  }

  return <RecentSearch />;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { query } };
};

export default SearchPage;
