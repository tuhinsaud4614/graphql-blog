import { GetServerSideProps, NextPage } from "next";

import { RecentSearch, SearchResult } from "@/components/search";

interface Props {
  query: { [key: string]: any };
}

const SearchPage: NextPage<Props> = ({ query }) => {
  if ("q" in query && query.q !== "") {
    return <SearchResult query={query} />;
  }

  return <RecentSearch />;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { query } };
};

export default SearchPage;
