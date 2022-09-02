import { AuthGuard, ClientOnly, Tabs } from "@component";
import { ROUTES } from "@constants";
import { UserLayout } from "components/Layout";
import {
  UserHomeFollowList,
  UserHomeTabFollowing,
  UserHomeTabRecommended,
} from "components/user-home";
import {
  GetFollowingAuthorPostsDocument,
  GetFollowingAuthorPostsQuery,
  GetFollowingAuthorPostsQueryVariables,
  GetPostsDocument,
  GetPostsQuery,
  GetPostsQueryVariables,
  UserRole,
} from "graphql/generated/schema";
import { addApolloState, initializeApollo } from "lib/apollo";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { isDev, queryChecking } from "utils";
import { withSSRAuth } from "utils/ssr";

const className = {
  top: "flex items-center text-neutral-focus dark:text-neutral-dark-focus my-6",
  topIcon:
    "w-9 h-9 flex items-center justify-center rounded-full bg-base-300 dark:bg-base-dark-300 mr-2",
};

const tabs = ["following", "recommended"];

interface Props {
  query: { [key: string]: any };
}

const MyHome: NextPage<Props> = ({ query }) => {
  const [currentTab, setCurrentTab] = useState(() =>
    queryChecking(query, tabs, "tab", 1)
  );
  const { replace } = useRouter();

  useEffect(() => {
    setCurrentTab(queryChecking(query, tabs, "tab", 1));
  }, [query]);

  return (
    <AuthGuard role={UserRole.Author}>
      <UserLayout>
        <Link href={ROUTES.mySuggestions}>
          <a aria-label="Suggestions" className={className.top}>
            <span className={className.topIcon}>
              <BsPlusLg size={12} />
            </span>
            <p>Keep up with the latest in any topic</p>
          </a>
        </Link>
        <ClientOnly>
          <UserHomeFollowList />
        </ClientOnly>
        <Tabs
          tabs={tabs}
          onTab={(index) => {
            replace(index === 0 ? ROUTES.myHomeFollowing : ROUTES.myHome);
          }}
          selectedTab={currentTab}
        >
          {currentTab === 0 ? <UserHomeTabFollowing /> : <Fragment />}
          {currentTab === 1 ? <UserHomeTabRecommended /> : <Fragment />}
        </Tabs>
      </UserLayout>
    </AuthGuard>
  );
};

// export const getServerSideProps: GetServerSideProps =
//   nextReduxWrapper.getServerSideProps(
//     ({ dispatch }) =>
//       async ({ query, req }) => {
//         let accessToken: undefined | string;
//         try {
//           accessToken = await fetchRefreshToken(req);

//           if (!accessToken) {
//             dispatch(setAuthUser({ user: null, token: null }));
//             return {
//               redirect: { destination: ROUTES.home, permanent: false },
//               props: {},
//             };
//           }

//           const user = getAuthUser(accessToken);
//           dispatch(setAuthUser({ user, token: accessToken }));
//         } catch (error) {
//           dispatch(setAuthUser({ user: null, token: null }));
//           return {
//             redirect: { destination: ROUTES.home, permanent: false },
//             props: {},
//           };
//         }

//         const client = initializeApollo(undefined, accessToken);

//         if ("tab" in query && query["tab"] === "following") {
//           try {
//             await client.query<
//               GetFollowingAuthorPostsQuery,
//               GetFollowingAuthorPostsQueryVariables
//             >({
//               query: GetFollowingAuthorPostsDocument,
//               variables: { limit: 10 },
//               errorPolicy: "all",
//             });

//             return addApolloState(client, { props: { query } });
//           } catch (error) {
//             isDev() && console.log(error);
//             return addApolloState(client, { props: { query } });
//           }
//         }

//         try {
//           await client.query<GetPostsQuery, GetPostsQueryVariables>({
//             query: GetPostsDocument,
//             variables: { limit: 10 },
//             errorPolicy: "all",
//           });

//           return addApolloState(client, { props: { query } });
//         } catch (error) {
//           isDev() && console.log(error);
//           return addApolloState(client, { props: { query } });
//         }
//       }
//   );

// const withSSRAuth = (
//   cb: <P extends {} = any>(
//     store: Store,
//     ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
//     token?: string
//   ) => Promise<GetServerSidePropsResult<P>>
// ) =>
//   nextReduxWrapper.getServerSideProps((store) => async (ctx) => {
//     const { dispatch } = store;
//     const { req } = ctx;
//     let accessToken: undefined | string;
//     try {
//       accessToken = await fetchRefreshToken(req);

//       if (!accessToken) {
//         dispatch(setAuthUser({ user: null, token: null }));
//         return {
//           redirect: { destination: ROUTES.home, permanent: false },
//           props: {},
//         };
//       }

//       const user = getAuthUser(accessToken);
//       dispatch(setAuthUser({ user, token: accessToken }));
//     } catch (error) {
//       dispatch(setAuthUser({ user: null, token: null }));
//       return {
//         redirect: { destination: ROUTES.home, permanent: false },
//         props: {},
//       };
//     }
//     const result = await cb(store, ctx, accessToken);
//     return result;
//   });

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  ROUTES.home,
  async (_, { query }, accessToken) => {
    const client = initializeApollo(undefined, accessToken);

    if ("tab" in query && query["tab"] === "following") {
      try {
        await client.query<
          GetFollowingAuthorPostsQuery,
          GetFollowingAuthorPostsQueryVariables
        >({
          query: GetFollowingAuthorPostsDocument,
          variables: { limit: 10 },
          errorPolicy: "all",
        });

        return addApolloState(client, { props: { query } });
      } catch (error) {
        isDev() && console.log(error);
        return addApolloState(client, { props: { query } });
      }
    }

    try {
      await client.query<GetPostsQuery, GetPostsQueryVariables>({
        query: GetPostsDocument,
        variables: { limit: 10 },
        errorPolicy: "all",
      });

      return addApolloState(client, { props: { query } });
    } catch (error) {
      isDev() && console.log(error);
      return addApolloState(client, { props: { query } });
    }
  }
);

export default MyHome;