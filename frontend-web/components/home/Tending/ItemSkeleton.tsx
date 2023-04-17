import classNames from "classnames";

import { UserLinkSkeleton } from "@/components";

const className = {
  root: "basis-full md:basis-1/2 md1:basis-1/3 px-3 md:px-4",
  container: "flex mb-6",
  common: "bg-neutral/20 animate-pulse dark:bg-neutral-dark/20",
  index: "w-5 h-5 mr-4 -mt-2.5 shrink-0",
  content: "flex flex-col w-full",
  title: "w-full h-5 my-2",
  timeBox: "flex items-center",
};

export default function TrendingItemSkeleton() {
  return (
    <li className={className.root}>
      <section className={className.container}>
        <span className={classNames(className.index, className.common)} />
        <div className={className.content}>
          <UserLinkSkeleton />

          <span className={classNames(className.title, className.common)} />
          <span className={className.timeBox}>
            <span className={classNames(className.common, "w-1/3 h-2")} />
          </span>
        </div>
      </section>
    </li>
  );
}
