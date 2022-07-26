import { FollowItem, Tag } from "components";
import { SidebarCategory, SidebarContent } from "components/Sidebar";
import { Fragment, ReactNode } from "react";
import { ROUTES } from "utils/constants";

import Container from "./Container";

interface Props {
  hideSidebar?: boolean;
  children: ReactNode;
}

const className = {
  divider: "bg-neutral w-full border-b my-4",
  link: "first:mt-3 first:ml-3 !rounded-full text-neutral/75 bg-neutral/5 active:scale-95",
  items: "list-none m-0 flex flex-wrap space-x-3 space-y-3 -mt-3 -ml-3",
};

export default function UserLayout({ hideSidebar = false, children }: Props) {
  return (
    <Container
      sidebar={
        hideSidebar ? null : (
          <Fragment>
            {/* <Skeleton />
          <div className="pt-5" />
          <Skeleton /> */}
            <SidebarContent
              title="Categories"
              moreLink="/categories"
              moreText="See all the categories"
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
            <div className={className.divider} />
            <SidebarContent
              title="Recommended tags"
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
            <SidebarContent
              moreLink={ROUTES.mySuggestions}
              moreText="See more suggestions"
              title="Who to follow"
              classes={{ items: "pb-8" }}
            >
              <FollowItem />
              <FollowItem />
              <FollowItem />
              <FollowItem />
            </SidebarContent>
          </Fragment>
        )
      }
    >
      {children}
    </Container>
  );
}
