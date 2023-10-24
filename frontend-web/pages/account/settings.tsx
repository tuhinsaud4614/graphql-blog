import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { AuthGuard } from "@/components";
import { LayoutContainer } from "@/components/Layout";
import {
  SettingsAvatarEdit,
  SettingsNameEdit,
  SettingsPasswordChange,
} from "@/components/settings";
import { selectUser } from "@/features";
import { useAppSelector } from "@/store";
import { ROUTES } from "@/utils/constants";
import { withSSRAuth } from "@/utils/ssr";

const className = {
  title:
    "border-b dark:border-base-dark-300 pb-2 my-6 text-neutral dark:text-neutral-dark font-bold line-clamp-1 text-ellipsis md:leading-[3.25rem] text-xl md:text-[2.625rem]",
  items: "flex flex-col m-0 list-none",
};

const SettingsPage: NextPage = () => {
  const user = useAppSelector(selectUser);
  return (
    <AuthGuard>
      <LayoutContainer>
        <Head>
          <title>The RAT Diary | Your settings</title>
        </Head>
        <h1 className={className.title}>About you</h1>
        <ul className={className.items}>
          <SettingsNameEdit user={user} />
          <SettingsAvatarEdit />
          <SettingsPasswordChange />
        </ul>
      </LayoutContainer>
    </AuthGuard>
  );
};

export const getServerSideProps: GetServerSideProps = withSSRAuth(ROUTES.login);

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const token = getCookie("refreshToken", { req, res });
//   if (!token) {
//     return {
//       redirect: { destination: ROUTES.login, permanent: false },
//       props: {},
//     };
//   }
//   return { props: {} };
// };

export default SettingsPage;
