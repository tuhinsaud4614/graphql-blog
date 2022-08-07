import { LayoutContainer } from "components/Layout";
import {
  SettingsAvatarEdit,
  SettingsNameEdit,
  SettingsPasswordChange,
} from "components/settings";
import { getCookie } from "cookies-next";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { ROUTES } from "utils/constants";

const className = {
  title:
    "border-b dark:border-base-dark-300 pb-2 my-6 text-neutral dark:text-neutral-dark font-bold line-clamp-1 text-ellipsis md:leading-[3.25rem] text-xl md:text-[2.625rem]",
  items: "flex flex-col m-0 list-none",
};

const SettingsPage: NextPage = () => {
  return (
    <LayoutContainer>
      <Head>
        <title>The RAT Diary | Your settings</title>
      </Head>
      <h1 className={className.title}>About you</h1>
      <ul className={className.items}>
        <SettingsNameEdit />
        <SettingsAvatarEdit />
        <SettingsPasswordChange />
      </ul>
    </LayoutContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = getCookie("refreshToken", { req, res });
  if (!token) {
    return {
      redirect: { destination: ROUTES.login, permanent: false },
      props: {},
    };
  }
  return { props: {} };
};

export default SettingsPage;
