import { NextPageWithLayout } from "@types";
import { UserLayout } from "components/layout";
import { Fragment, ReactElement } from "react";

const CreatePost: NextPageWithLayout = () => {
  return <Fragment>Create</Fragment>;
};

CreatePost.getLayout = (page: ReactElement) => {
  return <UserLayout>{page}</UserLayout>;
};
export default CreatePost;
