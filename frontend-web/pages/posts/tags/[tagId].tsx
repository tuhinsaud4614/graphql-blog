import { SearchLayout } from "components/Layout";
import { NextPage } from "next";
import { Fragment } from "react";

const PostsByTagPage: NextPage = () => {
  return (
    <SearchLayout sidebar={<Fragment />}>
      <div>PostsByTagPage</div>
    </SearchLayout>
  );
};

export default PostsByTagPage;
