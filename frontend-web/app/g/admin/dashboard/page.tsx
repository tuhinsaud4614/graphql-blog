import { Metadata } from "next";

import Breadcrumbs from "@/components/Breadcrumbs";

import Title from "../_components/Title";
import AdminDashboardCardGroups from "./_components/CardGroups";

export const metadata: Metadata = {
  title: "The RAT Diary | Dashboard",
};

const links = [
  {
    children: "Dashboard",
    active: true,
  },
  {
    children: "Overview",
    active: true,
  },
];

export default function Dashboard() {
  return (
    <>
      <Title className="text-primary selection:bg-primary selection:text-primary-foreground">
        Dashboard
      </Title>
      <Breadcrumbs classes={{ root: "pt-1" }} items={links} />
      <AdminDashboardCardGroups />
    </>
  );
}
