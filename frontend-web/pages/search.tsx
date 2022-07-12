import { NextPageWithLayout } from "@types";
import { SearchLayout } from "components/Layout";
import { RecentSearch } from "components/search";
import { GetServerSideProps } from "next";
import { Fragment } from "react";

interface Props {
  query: { [key: string]: any };
}

const Search: NextPageWithLayout<Props> = ({ query }) => {
  if (!("q" in query) || query.q === "") {
    return (
      <SearchLayout sidebar={<Fragment />}>
        <RecentSearch />
      </SearchLayout>
    );
  }

  return <SearchLayout sidebar={<Fragment />}>{query["q"]}</SearchLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { query } };
};

export default Search;
