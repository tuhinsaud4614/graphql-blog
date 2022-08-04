import classNames from "classnames";
import { Fragment, ReactNode } from "react";
import BottomTab from "./BottomTab";
import Header from "./Header";
import Sidebar from "./Sidebar";
import SideNav from "./SideNav";

interface Props {
  children?: ReactNode;
  sidebar?: ReactNode;
  classes?: {
    container?: string;
    main?: string;
  };
}

const className = {
  container: "max-w-[94rem] mx-auto flex",
  main: "mx-auto max-w-[45.25rem] flex-auto px-4 py-[4.5rem] lg:py-4",
};

export default function Container({ sidebar, classes, children }: Props) {
  return (
    <Fragment>
      <Header />
      <section className={classNames(className.container, classes?.container)}>
        <SideNav />
        <main className={classNames(className.main, classes?.main)}>
          {children}
        </main>
        {sidebar && <Sidebar>{sidebar}</Sidebar>}
      </section>
      <BottomTab />
    </Fragment>
  );
}
