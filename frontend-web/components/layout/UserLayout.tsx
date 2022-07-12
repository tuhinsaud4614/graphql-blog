import { Categories, Follow, Tags } from "components/Sidebar";
import { Fragment, ReactNode } from "react";

import Container from "./Container";

interface Props {
  children: ReactNode;
}

const className = {
  divider: "bg-neutral w-full border-b my-4",
};

export default function UserLayout({ children }: Props) {
  return (
    <Container
      sidebar={
        <Fragment>
          {/* <Skeleton />
          <div className="pt-5" />
          <Skeleton /> */}
          <Categories />
          <div className={className.divider} />
          <Tags />
          <div className={className.divider} />
          <Follow />
        </Fragment>
      }
    >
      {children}
    </Container>
  );
}
