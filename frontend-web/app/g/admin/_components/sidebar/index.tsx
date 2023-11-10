"use client";

import { LayoutDashboard } from "lucide-react";

import CategoryIcon from "@/components/svg/Category";
import useMediaQuery from "@/hooks/useMediaQuery";
import { ROUTES } from "@/lib/constants";

import { useAdminDrawerController } from "../../_context-hooks/useDrawerController";
import SidebarContainer from "./Container";
import AdminSidebarItem from "./Item";
import AdminSidebarTitle from "./Title";
import Top from "./Top";

export default function AdminLayoutSidebar() {
  const matches = useMediaQuery("(min-width: 1280px)");
  const { isOpen, setIsOpen } = useAdminDrawerController();

  const handleToggle = () => setIsOpen?.((prev) => !prev);

  const handleClose = () => setIsOpen?.(false);

  return (
    <SidebarContainer onClose={handleClose} matches={matches} visible={isOpen}>
      <Top visible={isOpen} onToggle={handleToggle} />
      <ul className="flex flex-col gap-2 overflow-hidden px-4">
        <AdminSidebarItem
          href={ROUTES.admin.dashboard}
          icon={
            <LayoutDashboard
              size={24}
              className="shrink-0 [&_path]:stroke-current"
            />
          }
        >
          <AdminSidebarTitle visible={isOpen}>Dashboard</AdminSidebarTitle>
        </AdminSidebarItem>
        <AdminSidebarItem
          href={ROUTES.admin.categories}
          icon={
            <CategoryIcon className="h-6 w-6 shrink-0 [&_path]:fill-current" />
          }
        >
          <AdminSidebarTitle visible={isOpen}>Categories</AdminSidebarTitle>
        </AdminSidebarItem>
      </ul>
    </SidebarContainer>
  );
}
