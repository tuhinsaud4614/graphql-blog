import { Metadata } from "next";

import Breadcrumbs, { BreadcrumbsProps } from "@/components/Breadcrumbs";
import { ROUTES } from "@/lib/constants";

import Title from "../_components/Title";
import AdminTags from "./_components/Tags";

export const metadata: Metadata = {
  title: "The RAT Diary | Tags",
};

const links: BreadcrumbsProps["items"] = [
  {
    children: "Dashboard",
    active: false,
    link: { href: ROUTES.admin.dashboard },
  },
  {
    children: "Tags",
    active: true,
  },
];

export default function AdminTagsPage() {
  return (
    <>
      <Title className="text-primary selection:bg-primary selection:text-primary-foreground">
        Tags
      </Title>
      <Breadcrumbs classes={{ root: "pt-1 mb-2" }} items={links} />
      <AdminTags />
    </>
  );
}
