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
            <Tags />
            <Authors />
          </Fragment>
        )
      }
    >
      {children}
    </Container>
  );
}
