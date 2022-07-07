import { Fragment, ReactNode } from "react";
import Container from "../Container";
import Categories from "./Categories";
import Follow from "./Follow";
import Tags from "./Tags";

interface Props {
  children: ReactNode;
}

const className = {
  container: "max-w-[94rem] mx-auto flex",
  main: "h-[1000px] mx-auto lg:m-0 max-w-[43.25rem] lg:max-w-full flex-auto px-4 py-[4.5rem] lg:py-4",
  divider: "bg-neutral w-full border-b my-4",
};

export default function UserLayout({ children }: Props) {
  return (
    <Container
      sidebar={
        <Fragment>
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
