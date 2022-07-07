import { Fragment, ReactNode } from "react";
import BottomTab from "./BottomTab";
import Header from "./Header";
import Sidebar from "./Sidebar";
import SideNav from "./SideNav";

interface Props {
  children: ReactNode;
  sidebar?: ReactNode;
}

const className = {
  container: "max-w-[94rem] mx-auto flex",
  main: "h-[1000px] mx-auto lg:m-0 max-w-[43.25rem] lg:max-w-full flex-auto px-4 py-[4.5rem] lg:py-4",
};

export default function Container({ sidebar, children }: Props) {
  return (
    <Fragment>
      <Header />
      <section className={className.container}>
        <SideNav />
        <main className={className.main}>{children}</main>
        {sidebar && <Sidebar>{sidebar}</Sidebar>}
      </section>
      <BottomTab />
    </Fragment>
  );
}
