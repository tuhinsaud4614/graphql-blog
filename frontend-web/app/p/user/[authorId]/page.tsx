"use client";

import * as React from "react";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import _omit from "lodash/omit";

import {
  AuthorInfoAboutTab,
  AuthorInfoHomeTab,
} from "@/app/p/user/[authorId]/_components/authorInfo";
import { DemoAvatar, Tabs } from "@/components";
import CreatePostTitle from "@/components/post-create/CreatePostTitle";
import {
  FUserFragment,
  useGetUserWithPostQuery,
} from "@/graphql/generated/schema";
import { ROUTES } from "@/lib/constants";
import { IAuthUser } from "@/lib/types";
import { generateFileUrl, getUserName } from "@/lib/utils";

const className = {
  title: "mb-4 mt-8 flex items-center",
  titleImg:
    "w-8 h-8 mr-5 overflow-hidden rounded-full md:hidden dark:ring-1 dark:ring-secondary-dark",
  titleText:
    "text-[1.375rem] leading-7 tracking-normal font-bold text-neutral dark:text-neutral-dark line-clamp-1 text-ellipsis md:text-[2.625rem] md:leading-[3.25rem]",
};

const tabs = ["home", "about"];

function queryChecking<T extends { [key: string]: any }>(
  query: T,
  tabs: string[] | Readonly<string[]>,
  queryName: keyof T,
  defaultReturn = 0,
) {
  if (query && queryName in query && query[queryName]) {
    const tab = tabs.findIndex((t) => t === decodeURI(query[queryName]));
    return tab === -1 ? defaultReturn : tab;
  }
  return defaultReturn;
}

interface Props {
  params: Promise<{ authorId: string }>;
}

export default function AboutPage({ params }: Readonly<Props>) {
  const { authorId } = React.use(params);
  const { replace } = useRouter();
  const query = useSearchParams();
  const [currentTab, setCurrentTab] = React.useState(() => {
    const entries = query?.entries ? Array.from(query.entries()) : [];
    return queryChecking(
      entries.reduce(
        (p, c) => ({ ...p, [c[0]]: c[1] }),
        {} as { [key: string]: string },
      ),
      tabs,
      "tab",
    );
  });

  const { data } = useGetUserWithPostQuery({
    notifyOnNetworkStatusChange: true,
    variables: { id: authorId },
    fetchPolicy: "network-only",
  });

  if (!data?.user) {
    return null;
  }

  const user = _omit(data.user, [
    "__typename",
    "password",
    "followers",
    "followings",
  ]) as FUserFragment;
  const imgUrl = generateFileUrl(user.avatar?.url);
  const userName = getUserName(user);
  return (
    <>
      <div className={className.title}>
        {imgUrl ? (
          <span className={className.titleImg}>
            <Image
              src={imgUrl}
              alt={userName ?? ""}
              width={32}
              height={32}
              className="object-cover"
              priority
            />
          </span>
        ) : (
          <DemoAvatar className="mr-5 size-8 md:hidden" size={32 / 1.8} />
        )}
        <h1 className={className.titleText}>{userName}</h1>
        <CreatePostTitle />
      </div>
      <Tabs
        tabs={tabs}
        onTab={(index) => {
          setCurrentTab(index);
          replace(
            index === 0
              ? ROUTES.user.userProfile(authorId)
              : ROUTES.user.userProfile(authorId) + "?tab=about",
          );
        }}
        selectedTab={currentTab}
      >
        {currentTab === 0 ? (
          <AuthorInfoHomeTab posts={data.user.posts} />
        ) : null}
        {currentTab === 1 ? (
          <AuthorInfoAboutTab
            user={user as IAuthUser}
            userId={user.id || authorId}
          />
        ) : null}
      </Tabs>
    </>
  );
}
