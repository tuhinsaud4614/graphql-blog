import { NextPageWithLayout } from "@types";
import { useRouter } from "next/router";
import { Fragment } from "react";

const Search: NextPageWithLayout = () => {
  const { query } = useRouter();
  console.log(query);

  return <Fragment>Search</Fragment>;
};

export default Search;
