import { ROUTES } from "@constants";
import { UserLink } from "components";
import Link from "next/link";

const className = {
  root: "flex flex-col",
  content: "mt-2",
  title: "font-bold text-neutral dark:text-neutral-dark",
  timeBox:
    "pt-2 flex items-center text-xs text-neutral/70 dark:text-neutral-dark/70",
};

export default function PostItem() {
  return (
    <li className={className.root}>
      <UserLink href={ROUTES.authorProfile("1")} src="/favicon.ico">
        Blake Lemoine
      </UserLink>
      <div className={className.content}>
        <Link href="/post/1234" passHref>
          <a aria-label="title" className={className.title}>
            How Huuuge Casino Became the #1 Social Casino Game
          </a>
        </Link>
        <div className={className.timeBox}>
          <time>Oct 20, 2017</time>
        </div>
      </div>
    </li>
  );
}
