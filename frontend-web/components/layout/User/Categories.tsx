import Link from "next/link";
import { Fragment } from "react";
import Category from "./Category";

const className = {
  title: "text-neutral mb-2 capitalize font-medium",
  items: "list-none m-0",
  more: "flex items-center justify-center text-xs",
  moreLink:
    "rounded-full px-3 py-1.5 bg-success text-neutral hover:bg-success-focus hover:text-base-100 active:scale-95",
};

export default function Categories() {
  return (
    <Fragment>
      <p className={className.title}>Categories</p>
      <ul className={className.items}>
        <Category title="New Category" link={`/posts/categoryId`} />
        <Category title="New Category" link={`/posts/categoryId`} />
        <Category title="New Category" link={`/posts/categoryId`} />
        <Category title="New Category" link={`/posts/categoryId`} />
        <li className={className.more}>
          <Link href="/categories" passHref>
            <a aria-label="Categories" className={className.moreLink}>
              See all the categories
            </a>
          </Link>
        </li>
      </ul>
    </Fragment>
  );
}
