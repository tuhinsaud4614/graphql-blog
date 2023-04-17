import { useEffect } from "react";

import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { ROUTES } from "@constants";
import { UserLayout } from "components/Layout";
import { useAppDispatch } from "store";
import { withSSRAuth } from "utils/ssr";

import { seenAll } from "@/features/notificationSlice";

const className = {
  title:
    "my-6 text-neutral dark:text-neutral-dark font-bold line-clamp-1 text-ellipsis md:leading-[3.25rem] text-xl md:text-[2.625rem]",
};

const NotificationsPage: NextPage = () => {
  const rdxDispatch = useAppDispatch();
  useEffect(() => {
    rdxDispatch(seenAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserLayout>
      <Head>
        <title>The RAT Diary | Notifications</title>
      </Head>
      <h1 className={className.title}>Notifications</h1>
    </UserLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  ROUTES.myHome,
);
export default NotificationsPage;
