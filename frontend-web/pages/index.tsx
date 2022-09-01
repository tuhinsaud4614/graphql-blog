import { ROUTES } from "@constants";
import { Banner, HomeContent, HomeHeader, Tending } from "components/home";
import { getCookie } from "cookies-next";
import {
  GetPostsDocument,
  GetPostsQuery,
  GetPostsQueryVariables,
  GetTrendingPostsDocument,
} from "graphql/generated/schema";
import { addApolloState, initializeApollo } from "lib/apollo";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import { isDev } from "utils";

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
    await client.query<GetPostsQuery, GetPostsQueryVariables>({
      query: GetPostsDocument,
      variables: { limit: 1 },
    });
  } catch (error) {
    isDev() && console.log("error", error);
  }
  return addApolloState(client, { props: {} });
};

export default Home;
