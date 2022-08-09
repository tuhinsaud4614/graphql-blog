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
import { ROUTES } from "utils/constants";

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
  const token = getCookie("refreshToken", { req, res });
  if (token) {
    return {
      redirect: { destination: ROUTES.myHome, permanent: false },
      props: {},
    };
  }

  const client = initializeApollo();
  try {
    await Promise.any([
      client.query({
        query: GetTrendingPostsDocument,
      }),
      client.query<GetPostsQuery, GetPostsQueryVariables>({
        query: GetPostsDocument,
        variables: { limit: 2, page: 1 },
      }),
    ]);
  } catch (error) {
    process.env.NODE_ENV === "development" && console.log("error", error);
  }

  return addApolloState(client, { props: {} });
};

export default Home;
