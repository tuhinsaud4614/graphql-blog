import { Fragment, ReactNode } from "react";
import BottomTab from "./BottomTab";
import Header from "./Header";
import SideNav from "./SideNav";

interface Props {
  children: ReactNode;
}

const className = {
  container: "max-w-[94rem] mx-auto flex",
};

export default function UserLayout({ children }: Props) {
  return (
    <Fragment>
      <Header />
      <section className={className.container}>
        <SideNav />
        <main className="h-[1000px]">{children}</main>
      </section>
      <BottomTab />
    </Fragment>
  );
}
