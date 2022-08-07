import { gql } from "@apollo/client";
import { ClientOnly, Tabs } from "@component";
import {
  AuthorInfoAboutTab,
  AuthorInfoFollowerList,
  AuthorInfoFollowingList,
  AuthorInfoHomeTab,
} from "components/authorInfo";
import { LayoutContainer } from "components/Layout";
import { SidebarUserProfiler } from "components/Sidebar";
import { initializeApollo } from "lib/apollo";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { getUserName, queryChecking } from "utils";
import { ROUTES } from "utils/constants";
import { IUser } from "utils/interfaces";

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
  user: IUser | null;
}

const AboutPage: NextPage<Props> = ({ query, user }) => {
  const [currentTab, setCurrentTab] = useState(() =>
    queryChecking(query, tabs, "tab")
  );
  const { replace } = useRouter();
  const { authorId } = query;

  return (
    <LayoutContainer
      sidebar={
        <Fragment>
          <ClientOnly>
            <SidebarUserProfiler user={user} classes={{ root: "mb-10" }} />
          </ClientOnly>
          <AuthorInfoFollowingList />
          <AuthorInfoFollowerList />
        </Fragment>
      }
    >
      <Head>{user && <title>The RAT Diary | {getUserName(user)}</title>}</Head>
      <div className={className.title}>
        <span className={className.titleImg}>
          <Image
            src="/demo.png"
            alt="Avatar"
            width={32}
            height={32}
            layout="responsive"
            objectFit="cover"
          />
        </span>
        {user && <h1 className={className.titleText}>{getUserName(user)}</h1>}
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
        {currentTab === 0 ? <AuthorInfoHomeTab /> : <Fragment />}
        {currentTab === 1 ? (
          <ClientOnly>
            <AuthorInfoAboutTab user={user} />
          </ClientOnly>
        ) : (
          <Fragment />
        )}
      </Tabs>
    </LayoutContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const client = initializeApollo();

    const { data } = await client.query({
      query: gql`
        query GetUser($id: ID!) {
          user(id: $id) {
            id
            name
            mobile
            email
            password
            role
            authorStatus
            avatar {
              id
              url
              height
              width
            }
            about
            createdAt
            updatedAt
          }
        }
      `,

      errorPolicy: "all",
      variables: { id: query.authorId },
    });

    if (data && data.user) {
      return { props: { query, user: data.user } };
    }
    return { props: { query }, notFound: true };
  } catch (error) {
    return { props: { query }, notFound: true };
  }
};

export default AboutPage;
