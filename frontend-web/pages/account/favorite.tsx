import { PostItem } from "@component";
import { NextPageWithLayout } from "@types";
import { UserLayout } from "components/Layout";
import { Fragment, ReactElement } from "react";

const className = {
  title:
    "my-6 text-neutral font-bold line-clamp-1 text-ellipsis md:leading-[3.25rem] text-xl md:text-[2.625rem]",
  items: "list-none m-0",
  item: "border-b last:border-none py-5",
};

const FavoritePage: NextPageWithLayout = () => {
  return (
    <Fragment>
      <h1 className={className.title}>Your favorite posts</h1>
      <ul className={className.items}>
        <PostItem classes={{ root: className.item }} />
        <PostItem classes={{ root: className.item }} />
        <PostItem classes={{ root: className.item }} />
        <PostItem classes={{ root: className.item }} />
      </ul>
    </Fragment>
  );
};

FavoritePage.getLayout = (page: ReactElement) => {
  return <UserLayout>{page}</UserLayout>;
};

export default FavoritePage;
