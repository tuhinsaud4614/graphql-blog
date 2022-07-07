import { Tag } from "components";
import { Fragment } from "react";

const className = {
  title: "text-neutral mb-3 capitalize font-medium",
  items: "list-none m-0 flex flex-wrap space-x-3 space-y-3 -mt-3 -ml-3",
  link: "first:mt-3 first:ml-3 !rounded-full text-neutral/75 bg-neutral/5 active:scale-95",
};

export default function Tags() {
  return (
    <Fragment>
      <p className={className.title}>Recommended topics</p>
      <ul className={className.items}>
        <Tag href="/posts/tag/1234" className={className.link}>
          New Tag
        </Tag>
        <Tag href="/posts/tag/1234" className={className.link}>
          New Tag
        </Tag>
        <Tag href="/posts/tag/1234" className={className.link}>
          New Tag
        </Tag>
        <Tag href="/posts/tag/1234" className={className.link}>
          New Tag
        </Tag>
        <Tag href="/posts/tag/1234" className={className.link}>
          New Tag
        </Tag>
      </ul>
    </Fragment>
  );
}
