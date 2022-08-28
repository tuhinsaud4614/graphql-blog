import { AuthGuard, ClientOnly, DemoAvatar, Tabs } from "@component";
import { ROUTES } from "@constants";
import { useMediaQuery } from "@hooks";
import { IUser } from "@interfaces";
import {
  AuthorInfoAboutTab,
  AuthorInfoFollowerList,
  AuthorInfoFollowingList,
  AuthorInfoHomeTab,
} from "components/authorInfo";
import { LayoutContainer } from "components/Layout";
import { SidebarUserProfiler } from "components/Sidebar";
import {
  GetUserWithPostDocument,
  useGetUserWithPostQuery,
  UserRole,
} from "graphql/generated/schema";
import { addApolloState, initializeApollo } from "lib/apollo";
import _ from "lodash";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import {
  generateFileUrl,
  getUserName,
  queryChecking,
  ssrAuthorize,
} from "utils";

const className = {
  title: "mb-4 mt-8 flex items-center",
  titleImg:
    "w-8 h-8 mr-5 overflow-hidden rounded-full md:hidden dark:ring-1 dark:ring-secondary-dark",
  titleText:
    "text-[1.375rem] leading-7 tracking-normal font-bold text-neutral dark:text-neutral-dark line-clamp-1 text-ellipsis md:text-[2.625rem] md:leading-[3.25rem]",
};

const tabs = ["home", "about"];

interface Props {
  query: { [key: string]: any };
  // user: User;
}

const AboutPage: NextPage<Props> = ({ query }) => {
  const [currentTab, setCurrentTab] = useState(() =>
    queryChecking(query, tabs, "tab")
  );
  const matches = useMediaQuery("(min-width: 1024px)");
  const { replace } = useRouter();
  const { authorId } = query;

  const { data } = useGetUserWithPostQuery({
    notifyOnNetworkStatusChange: true,
    variables: { id: authorId },
    // fetchPolicy: "network-only",
  });

  if (!data?.user) {
    return null;
  }

  const user = _.omit(data.user, [
    "posts",
    "__typename",
    "password",
    "followers",
    "followings",
  ]) as IUser;
  const imgUrl = generateFileUrl(user.avatar?.url);
  const userName = getUserName(user);

  return (
    <AuthGuard role={UserRole.Author}>
      <LayoutContainer
        sidebar={
          <Fragment>
            <SidebarUserProfiler user={user} classes={{ root: "mb-10" }} />
            <ClientOnly>
              {matches && <AuthorInfoFollowingList authorId={authorId} />}
              {matches && <AuthorInfoFollowerList authorId={authorId} />}
            </ClientOnly>
          </Fragment>
        }
      >
        <div className={className.title}>
          {imgUrl ? (
            <span className={className.titleImg}>
              <Image
                loader={({ src, width, quality }) =>
                  `${src}?w=${width}&q=${quality || 75}`
                }
                src={imgUrl}
                alt={userName}
                width={32}
                height={32}
                layout="responsive"
                objectFit="cover"
              />
            </span>
          ) : (
            <DemoAvatar className="w-8 h-8 mr-5 md:hidden" size={32 / 1.8} />
          )}
          <h1 className={className.titleText}>{userName}</h1>
        </div>
        <Tabs
          tabs={tabs}
          onTab={(index) => {
            setCurrentTab(index);
            replace(
              index === 0
                ? ROUTES.authorProfile(authorId)
                : ROUTES.authorProfile(authorId) + "?tab=about"
            );
          }}
          selectedTab={currentTab}
        >
          {currentTab === 0 ? (
            <AuthorInfoHomeTab posts={data.user.posts} />
          ) : (
            <Fragment />
          )}
          {currentTab === 1 ? (
            <ClientOnly>
              {<AuthorInfoAboutTab user={user} userId={user.id || authorId} />}
            </ClientOnly>
          ) : (
            <Fragment />
          )}
        </Tabs>
      </LayoutContainer>
    </AuthGuard>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
  res,
}) => {
  try {
    const accessToken = await ssrAuthorize(req, res);

    if (!accessToken) {
      return {
        redirect: { destination: ROUTES.home, permanent: false },
        props: {},
      };
    }

    const client = initializeApollo(undefined, accessToken);

    await client.query({
      query: GetUserWithPostDocument,
      variables: { id: query.authorId },
    });

    return addApolloState(client, { props: { query } });
  } catch (error) {
    return { props: {}, notFound: true };
  }
};

export default AboutPage;
