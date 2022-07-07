import { NextPageWithLayout } from "@types";
import { UserLayout } from "components/Layout";
import { UserHomeFollowList } from "components/user-home";
import Link from "next/link";
import { Fragment, ReactElement } from "react";
import { BsPlusLg } from "react-icons/bs";

const className = {
  top: "flex items-center text-neutral-focus my-6",
  topIcon:
    "w-9 h-9 flex items-center justify-center rounded-full bg-base-300 mr-2",
};

const MyHome: NextPageWithLayout = () => {
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
    </Fragment>
  );
};

MyHome.getLayout = (page: ReactElement) => {
  return <UserLayout>{page}</UserLayout>;
};

export default MyHome;
