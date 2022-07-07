import { NextPageWithLayout } from "@types";
import { Tabs } from "components";
import { UserLayout } from "components/Layout";
import { UserHomeFollowList } from "components/user-home";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, ReactElement } from "react";
import { BsPlusLg } from "react-icons/bs";

const className = {
  top: "flex items-center text-neutral-focus my-6",
  topIcon:
    "w-9 h-9 flex items-center justify-center rounded-full bg-base-300 mr-2",
};

const tabs = ["Calendar", "Browser", "Store", "Friends", "Followers"];

const MyHome: NextPageWithLayout = () => {
  const { replace } = useRouter();
  return (
    <Fragment>
      <Link href="/account/me/following?tab=suggestions">
        <a aria-label="Suggestions" className={className.top}>
          <span className={className.topIcon}>
            <BsPlusLg size={12} />
          </span>
          <p>Keep up with the latest in any topic</p>
        </a>
      </Link>
      <UserHomeFollowList />
      {/* <UserHomeFollowSkeleton /> */}
      <Tabs
        tabs={["Calendar", "Browser", "Store", "Friends", "Followers"]}
        onTab={(_, key) => {
          replace(`/my-home?tab=${key}`);
        }}
      >
        {tabs.map((tab) => (
          <div key={tab}>
            {tab} It has survived not only five centuries, but also the leap
            into electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. Why do we use it? It is a long established fact that a reader
            will be distracted by the readable content of a page when looking at
            its layout. The point of using Lorem Ipsum is that it has a
            more-or-less normal distribution of letters, as opposed to using
            Content here, content here, making it look like readable English.
            Many desktop publishing packages and web page editors now use Lorem
            Ipsum as their default model text, and a search forlorem ipsum will
            uncover many web sites still in their infancy. Various versions have
            evolved over the years, sometimes by accident, sometimes on purpose
            (injected humour and the like).
          </div>
        ))}
      </Tabs>
    </Fragment>
  );
};

MyHome.getLayout = (page: ReactElement) => {
  return <UserLayout>{page}</UserLayout>;
};

export default MyHome;
