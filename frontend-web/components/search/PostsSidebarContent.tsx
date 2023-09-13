import * as React from "react";

import { Tag } from "@/components";
import { SidebarCategory, SidebarContent } from "@/components/Sidebar";
import { cn } from "@/utils";

const className = {
  divider: "bg-neutral dark:bg-base-dark-300 w-full border-b my-4",
  link: "first:mt-3 first:ml-3 !rounded-full text-neutral/75 dark:text-neutral-dark/75 bg-neutral/5 dark:bg-neutral-dark/5 active:scale-95",
  items: "list-none m-0 flex flex-wrap space-x-3 space-y-3 -mt-3 -ml-3",
};

interface Props {
  query: string;
  hide: "posts" | "author" | "categories" | "tags";
}

export default function PostsSidebarContent({ query, hide }: Props) {
  return (
    <React.Fragment>
      {hide !== "posts" && (
        <React.Fragment>
          <SidebarContent
            moreLink={`/search?q=${query}`}
            moreText="See all"
            title={`Posts matching ${query}`}
            classes={{ items: "space-y-4" }}
          >
            {/* <SidebarPostItem  />
            <SidebarPostItem />
            <SidebarPostItem />
            <SidebarPostItem /> */}
          </SidebarContent>
          <div className={className.divider} />
        </React.Fragment>
      )}
      {hide !== "tags" && (
        <React.Fragment>
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
        </React.Fragment>
      )}
      {hide !== "categories" && (
        <React.Fragment>
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
            className={cn(className.divider, hide === "author" && "hidden")}
          />
        </React.Fragment>
      )}
      {hide !== "author" && (
        <SidebarContent
          moreLink={`/search?q=${query}&t=author`}
          moreText="See more"
          title={`People matching ${query}`}
        >
          {/* <FollowItem />
          <FollowItem />
          <FollowItem />
          <FollowItem /> */}
        </SidebarContent>
      )}
      <div className="pt-8" />
    </React.Fragment>
  );
}
