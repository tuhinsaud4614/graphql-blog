import { Fragment, ReactNode } from "react";

import Container from "../Container";
import Authors from "./Authors";
import Categories from "./Categories";
import Tags from "./Tags";

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
            <Categories />
            <hr className={className.divider} />
            <Tags />
            <hr className={className.divider} />
            <Authors />
            {/* <SidebarContent
              moreLink={ROUTES.mySuggestions}
              moreText="See more suggestions"
              title="Who to follow"
              classes={{ items: "pb-8" }}
            >
              <FollowItem />
              <FollowItem />
              <FollowItem />
              <FollowItem />
            </SidebarContent> */}
          </Fragment>
        )
      }
    >
      {children}
    </Container>
  );
}
