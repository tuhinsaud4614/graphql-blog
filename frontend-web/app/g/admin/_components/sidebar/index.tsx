"use client";

import { LayoutDashboard } from "lucide-react";

import CategoryIcon from "@/components/svg/Category";
import { ROUTES } from "@/lib/constants";

import { useAdminDrawerController } from "../../_context-hooks/useDrawerController";
import SidebarContainer from "./Container";
import AdminSidebarItem from "./Item";
import AdminSidebarTitle from "./Title";
import Top from "./Top";

export default function AdminLayoutSidebar() {
  const { isOpen, setIsOpen } = useAdminDrawerController();

  const handleToggle = () => setIsOpen?.((prev) => !prev);

  const handleClose = () => setIsOpen?.(false);

  return (
    <SidebarContainer onClose={handleClose} visible={isOpen}>
      <Top visible={isOpen} onToggle={handleToggle} />
      <ul className="flex flex-col gap-2 overflow-hidden px-4">
        <AdminSidebarItem
          href={ROUTES.admin.dashboard}
          onClick={handleClose}
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
          onClick={handleClose}
        >
          <AdminSidebarTitle visible={isOpen}>Categories</AdminSidebarTitle>
        </AdminSidebarItem>
      </ul>
    </SidebarContainer>
  );
}
