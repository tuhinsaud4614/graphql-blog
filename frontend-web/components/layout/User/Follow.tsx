import Link from "next/link";
import { Fragment } from "react";
import FollowItem from "./FollowItem";

const className = {
  title: "text-neutral mb-2 font-medium",
  items: "list-none m-0 flex flex-col pb-8",
  more: "flex items-center text-xs mt-3",
  moreLink: "text-success hover:text-success-focus active:scale-95",
};

export default function Follow() {
  return (
    <Fragment>
      <p className={className.title}>Who to follow</p>
      <ul className={className.items}>
        <FollowItem />
        <FollowItem />
        <FollowItem />
        <FollowItem />
        <li className={className.more}>
          <Link href="/account/me/followings" passHref>
            <a aria-label="Categories" className={className.moreLink}>
              See more suggestions
            </a>
          </Link>
        </li>
      </ul>
    </Fragment>
  );
}
