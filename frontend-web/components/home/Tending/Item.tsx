import UserLink from "components/UserLink";
import Link from "next/link";
import { ROUTES } from "utils/constants";

const className = {
  root: "basis-full md:basis-1/2 md1:basis-1/3 px-3 md:px-4",
  container: "flex mb-6",
  index:
    "mr-4 -mt-2.5 inline-block text-3xl text-neutral/50 dark:text-neutral-dark/50 font-bold",
  content: "flex flex-col",
  title:
    "line-clamp-2 font-bold text-neutral-focus dark:text-neutral-dark-focus py-2 leading-4",
  timeBox:
    "flex items-center text-xs text-neutral/70 dark:text-neutral-dark/70",
};

interface Props {
  index: number;
}

export default function TrendingItem({ index }: Props) {
  return (
    <li className={className.root}>
      <section className={className.container}>
        <span className={className.index}>0{index}</span>
        <div className={className.content}>
          <UserLink href={ROUTES.authorProfile("1")} src="/favicon.ico">
            Blake Lemoine
          </UserLink>
          <Link href="/post/123" passHref>
            <a className={className.title}>Is LaMDA Sentient? - an Interview</a>
          </Link>
          <span className={className.timeBox}>
            <time>Jun 11</time>
            <span className="px-1.5">·</span>
            <time>44 min</time>
          </span>
        </div>
      </section>
    </li>
  );
}
