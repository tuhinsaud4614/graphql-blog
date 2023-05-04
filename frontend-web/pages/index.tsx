import * as React from "react";

import { GetServerSideProps, NextPage } from "next";

import { getCookie } from "cookies-next";

import { Banner, HomeContent, HomeHeader, Tending } from "@/components/home";
import {
  GetPostsWithCursorDocument,
  GetPostsWithCursorQuery,
  GetPostsWithCursorQueryVariables,
  GetTrendingPostsDocument,
} from "@/graphql/generated/schema";
import { addApolloState, initializeApollo } from "@/lib/apollo";
import { isDev } from "@/utils";
import { ROUTES } from "@/utils/constants";

const className = {
  main: "bg-base-100 dark:bg-base-dark-100",
};

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <HomeHeader />
      <main className={className.main}>
        <Banner />
        <Tending />
        <HomeContent />
      </main>
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = getCookie("jwt", { req, res });

  if (token) {
    return {
      redirect: { destination: ROUTES.myHome, permanent: false },
      props: {},
    };
  }

  const client = initializeApollo();
  try {
    await client.query({
      query: GetTrendingPostsDocument,
    });
    await client.query<
      GetPostsWithCursorQuery,
      GetPostsWithCursorQueryVariables
    >({
      query: GetPostsWithCursorDocument,
      variables: { limit: 1 },
    });
  } catch (error) {
    isDev() && console.log("error", error);
  }
  return addApolloState(client, { props: {} });
};

export default Home;
