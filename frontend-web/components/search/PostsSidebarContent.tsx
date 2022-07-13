import classNames from "classnames";
import { FollowItem, Tag } from "components";
import {
  SidebarCategory,
  SidebarContent,
  SidebarPostItem,
} from "components/Sidebar";
import { Fragment } from "react";

const className = {
  divider: "bg-neutral w-full border-b my-4",
  link: "first:mt-3 first:ml-3 !rounded-full text-neutral/75 bg-neutral/5 active:scale-95",
  items: "list-none m-0 flex flex-wrap space-x-3 space-y-3 -mt-3 -ml-3",
};

interface Props {
  query: string;
  hide: "posts" | "author" | "categories" | "tags";
}

export default function PostsSidebarContent({ query, hide }: Props) {
  return (
    <Fragment>
      {hide !== "posts" && (
        <Fragment>
          <SidebarContent
            moreLink={`/search?q=${query}`}
            moreText="See all"
            title={`Posts matching ${query}`}
            classes={{ items: "space-y-4" }}
          >
            <SidebarPostItem />
            <SidebarPostItem />
            <SidebarPostItem />
            <SidebarPostItem />
          </SidebarContent>
          <div className={className.divider} />
        </Fragment>
      )}
      {hide !== "tags" && (
        <Fragment>
          <SidebarContent
            moreLink={`/search?q=${query}&t=tags`}
            moreText="See more"
            title={`Tags matching ${query}`}
            classes={{ items: className.items }}
          >
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
          </SidebarContent>
          <div className={className.divider} />
        </Fragment>
      )}
      {hide !== "categories" && (
        <Fragment>
          <SidebarContent
            moreLink={`/search?q=${query}&t=categories`}
            moreText="See more"
            title={`Categories matching ${query}`}
          >
            <SidebarCategory
              title="New Category"
              link={`/posts/categories/1`}
            />
            <SidebarCategory
              title="New Category"
              link={`/posts/categories/2`}
            />
            <SidebarCategory
              title="New Category"
              link={`/posts/categories/3`}
            />
            <SidebarCategory
              title="New Category"
              link={`/posts/categories/4`}
            />
          </SidebarContent>
          <div
            className={classNames(
              className.divider,
              hide === "author" && "hidden"
            )}
          />
        </Fragment>
      )}
      {hide !== "author" && (
        <SidebarContent
          moreLink={`/search?q=${query}&t=author`}
          moreText="See more"
          title={`People matching ${query}`}
        >
          <FollowItem />
          <FollowItem />
          <FollowItem />
          <FollowItem />
        </SidebarContent>
      )}
      <div className="pt-8" />
    </Fragment>
  );
}
