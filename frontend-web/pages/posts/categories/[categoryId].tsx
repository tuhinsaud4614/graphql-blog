import { SearchLayout } from "components/Layout";
import { NextPage } from "next";
import { Fragment } from "react";

const PostsByCategoryPage: NextPage = () => {
  return (
    <SearchLayout sidebar={<Fragment />}>
      <div>PostsByCategoryPage</div>
    </SearchLayout>
  );
};

export default PostsByCategoryPage;
