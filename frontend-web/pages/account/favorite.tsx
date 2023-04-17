import Head from "next/head";

import { UserLayout } from "@/components/Layout";
import { NextPageWithLayout } from "@/utils/types";

const className = {
  title:
    "my-6 text-neutral dark:text-neutral-dark font-bold line-clamp-1 text-ellipsis md:leading-[3.25rem] text-xl md:text-[2.625rem]",
  items: "list-none m-0",
  item: "border-b last:border-none py-5",
};

const FavoritePage: NextPageWithLayout = () => {
  return (
    <UserLayout>
      <Head>
        <title>The RAT Diary | Favorites</title>
      </Head>
      <h1 className={className.title}>Your favorite posts</h1>
      <ul className={className.items}>
        {/* <PostItem classes={{ root: className.item }} />
        <PostItem classes={{ root: className.item }} />
        <PostItem classes={{ root: className.item }} />
        <PostItem classes={{ root: className.item }} /> */}
      </ul>
    </UserLayout>
  );
};

export default FavoritePage;
