import { LinkButton } from "@component";
import { ROUTES } from "@constants";
import { NextPageWithLayout } from "@types";
import { LayoutContainer } from "components/Layout";
import Head from "next/head";
import { Fragment } from "react";
import { BiChevronDown } from "react-icons/bi";

const className = {
  title:
    "my-6 text-neutral dark:text-neutral-dark font-bold line-clamp-1 text-ellipsis md:leading-[3.25rem] text-xl md:text-[2.625rem]",
  items: "list-none m-0 pt-3 flex flex-wrap space-x-3 space-y-3 -ml-3",
  item: "first:ml-3 first:mt-3",
  more: "flex items-center justify-center w-full bg-base-top dark:bg-base-dark-top",
  moreBtn:
    "flex items-center justify-center px-3 py-1 text-accent dark:text-accent-dark hover:text-accent-focus dark:hover:text-accent active:scale-95",
};

const Categories: NextPageWithLayout = () => {
  return (
    <LayoutContainer sidebar={<Fragment></Fragment>}>
      <Head>
        <title>The RAT Diary | Categories</title>
      </Head>
      <h1 className={className.title}>Categories</h1>
      <ul className={className.items}>
        {Array.from({ length: 20 }).map((_, index) => (
          <li key={index} className={className.item}>
            <LinkButton
              className="block"
              href={ROUTES.postsByCategory((index + 1).toString())}
              passHref
            >
              category - {index + 1}
            </LinkButton>
          </li>
        ))}
        <li className={className.more}>
          <button
            type="button"
            aria-label="Show more"
            className={className.moreBtn}
          >
            Show more
            <BiChevronDown size={24} />
          </button>
        </li>
      </ul>
    </LayoutContainer>
  );
};

export default Categories;
