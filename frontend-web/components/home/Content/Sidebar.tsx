import classNames from "classnames";
import { Tag } from "components";

const className = {
  root: "border-b md1:border-0 md1:max-w-[18rem] relative px-4 md1:px-0",
  container: "md1:sticky md1:left-0 md1:right-0 md1:top-[6.6875rem]",
  content: "pb-6 pt-6 md1:pt-0",
  title: "text-xs font-bold text-neutral dark:text-neutral-dark mb-4 uppercase",
  items: "flex flex-wrap space-x-2 space-y-2 -mt-2 -ml-2",
};

export default function Sidebar() {
  return (
    <aside className={className.root}>
      <div className={className.container}>
        <div className={className.content}>
          <p className={className.title}>
            DISCOVER MORE OF WHAT MATTERS TO YOU
          </p>
          <section className={className.items}>
            {Array.from({ length: 10 }).map((_, index) => (
              <Tag
                key={index}
                href="/post/tag/1234"
                className={classNames(index === 0 && "mt-2 ml-2")}
              >
                self {index + 1}
              </Tag>
            ))}
          </section>
        </div>
      </div>
    </aside>
  );
}
