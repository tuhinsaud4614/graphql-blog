import { LayoutContainer } from "components/Layout";
import { NextPage } from "next";
import { Fragment } from "react";

const MySuggestionsPage: NextPage = () => {
  return (
    <LayoutContainer sidebar={<Fragment>hello</Fragment>}>
      MySuggestionsPage
    </LayoutContainer>
  );
};

export default MySuggestionsPage;
