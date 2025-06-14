import { Metadata } from "next";

import Breadcrumbs, { BreadcrumbsProps } from "@/components/Breadcrumbs";
import { ROUTES } from "@/lib/constants";

import Title from "../_components/Title";
import AdminUsers from "./_components/Users";

export const metadata: Metadata = {
  title: "The RAT Diary | Users",
};

const links: BreadcrumbsProps["items"] = [
  {
    children: "Dashboard",
    active: false,
    link: { href: ROUTES.admin.dashboard },
  },
  {
    children: "Users",
    active: true,
  },
];

export default function AdminUsersPage() {
  return (
    <>
      <Title className="text-primary selection:bg-primary selection:text-primary-foreground">
        Users
      </Title>
      <Breadcrumbs classes={{ root: "pt-1 mb-2" }} items={links} />
      <AdminUsers />
    </>
  );
}
