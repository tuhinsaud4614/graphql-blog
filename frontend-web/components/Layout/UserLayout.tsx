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
  divider: "w-full border-b dark:border-base-dark-300 my-4",
  link: "first:mt-3 first:ml-3 !rounded-full bg-neutral/5 dark:bg-neutral-dark/5 active:scale-95",
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
              {Array.from({ length: 4 }).map((_, index) => (
                <SidebarCategory
                  key={index}
                  title={"New Category -" + (index + 1)}
                  link={ROUTES.postsByCategory("New Category" + (index + 1))}
                />
              ))}
            </SidebarContent>
            <hr className={className.divider} />
            <SidebarContent
              title="Recommended tags"
              classes={{ items: className.items }}
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <Tag
                  key={index}
                  href={ROUTES.postsByTag("New Tag" + (index + 1))}
                  className={className.link}
                >
                  New Tag - {index + 1}
                </Tag>
              ))}
            </SidebarContent>
            <hr className={className.divider} />
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
