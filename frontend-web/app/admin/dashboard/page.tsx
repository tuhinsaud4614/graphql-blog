import { Metadata } from "next";

import { BreadcrumbSegment } from "@/components/breadcrumb";
import { ROUTES } from "@/lib/constants";

import BreadCrumbsItems from "../_components/BreadCrumbsItems";
import Title from "../_components/Title";
import AdminDashboardCardGroups from "./_components/CardGroups";

export const metadata: Metadata = {
  title: "The RAT Diary | Dashboard",
};

const links: BreadcrumbSegment[] = [
  {
    label: "Dashboard",
    isActive: false,
    href: ROUTES.admin.dashboard,
  },
  {
    label: "Overview",
    isActive: true,
  },
];

export default function Dashboard() {
  return (
    <>
      <Title className="text-primary selection:bg-primary selection:text-primary-foreground">
        Dashboard
      </Title>
      {/* <Breadcrumbs classes={{ root: "pt-1" }} items={links} /> */}
      <BreadCrumbsItems links={links} className="mb-2 pt-1" />
      <AdminDashboardCardGroups />
    </>
  );
}
