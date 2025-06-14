import { Metadata } from "next";

import { BreadcrumbSegment } from "@/components/breadcrumb";
import { ROUTES } from "@/lib/constants";

import BreadCrumbsItems from "../_components/BreadCrumbsItems";
import Title from "../_components/Title";
import AdminCategories from "./_components/Categories";

export const metadata: Metadata = {
  title: "The RAT Diary | Categories",
};

// const links: BreadcrumbsProps["items"] = [
//   {
//     children: "Dashboard",
//     active: false,
//     link: { href: ROUTES.admin.dashboard },
//   },
//   {
//     children: "Categories",
//     active: true,
//   },
// ];

const links: BreadcrumbSegment[] = [
  {
    label: "Dashboard",
    isActive: false,
    href: ROUTES.admin.dashboard,
  },
  {
    label: "Categories",
    isActive: true,
  },
];

export default function AdminCategoryPage() {
  return (
    <>
      <Title className="text-primary selection:bg-primary selection:text-primary-foreground">
        Categories
      </Title>
      {/* <Breadcrumbs classes={{ root: "pt-1 mb-2" }} items={links} /> */}
      <BreadCrumbsItems className="mb-2 pt-1" links={links} />

      <AdminCategories />
    </>
  );
}
