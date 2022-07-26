import { AuthorInfoFollowingList } from "components/authorInfo";
import { LayoutContainer } from "components/Layout";
import { SidebarUserProfiler } from "components/Sidebar";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Fragment } from "react";

const AboutPage: NextPage = () => {
  const { query } = useRouter();
  return (
    <LayoutContainer
      sidebar={
        <Fragment>
          <SidebarUserProfiler
            own={query.authorId === "1"}
            classes={{ root: "mb-10" }}
          />
          <AuthorInfoFollowingList />
        </Fragment>
      }
    >
      hello
    </LayoutContainer>
  );
};

export default AboutPage;
