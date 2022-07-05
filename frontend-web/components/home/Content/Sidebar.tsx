import classNames from "classnames";
import { Tag } from "components";

const className = {
  root: "md1:max-w-[18rem]",
  container: "sticky left-0 right-0 top-0",
  content: "pb-6 pt-6 md1:pt-0",
  title: "text-xs font-bold text-neutral mb-4 uppercase",
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
