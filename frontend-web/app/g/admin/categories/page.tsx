import { Metadata } from "next";

import Breadcrumbs, { BreadcrumbsProps } from "@/components/Breadcrumbs";
import { ROUTES } from "@/lib/constants";

import Title from "../_components/Title";
import AdminCategories from "./_components/Categories";

export const metadata: Metadata = {
  title: "The RAT Diary | Categories",
};

const links: BreadcrumbsProps["items"] = [
  {
    children: "Dashboard",
    active: false,
    link: { href: ROUTES.admin.dashboard },
  },
  {
    children: "Categories",
    active: true,
  },
];

export default function AdminCategory() {
  return (
    <>
      <Title className="text-primary selection:bg-primary selection:text-primary-foreground">
        Categories
      </Title>
      <Breadcrumbs classes={{ root: "pt-1 mb-2" }} items={links} />
      <AdminCategories />
    </>
  );
}
