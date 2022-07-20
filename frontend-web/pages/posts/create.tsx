import { NextPageWithLayout } from "@types";
import { PostCreateContainer, PostCreateHeader } from "components/post-create";
import { Fragment, ReactElement } from "react";

const CreatePost: NextPageWithLayout = () => {
  return <Fragment>Create</Fragment>;
};

CreatePost.getLayout = (page: ReactElement) => {
  return (
    <Fragment>
      <PostCreateHeader />
      <PostCreateContainer>{page}</PostCreateContainer>
    </Fragment>
  );
};
export default CreatePost;
