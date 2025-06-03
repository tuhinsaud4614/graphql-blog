"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { LayoutDashboardIcon } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

import CategoryIcon from "@/components/svg/Category";
import Container from "./Container";
import Item from "./Item";
import Top from "./Top";

function Title({
  visible,
  children,
}: React.PropsWithChildren<{ visible: boolean }>) {
  return (
    <span
      className={cn(
        "duration-300",
        !visible && "xl:hidden xl:group-hover:block",
      )}
    >
      {children}
    </span>
  );
}

export default function Sidebar() {
  const { asPath } = useRouter();
  const matches = useMediaQuery("(min-width: 1280px)");
  // const visible = useAppSelector(selectAdminSidebar);
  const visible = false;
  // const rdxDispatch = useAppDispatch();

  // const handleToggle = () => rdxDispatch(adminToggleSidebar());

  // const handleClose = () => rdxDispatch(adminSetSidebar(false));
  const handleToggle = () => {};

  const handleClose = () => {};

  return (
    <Container onClose={handleClose} matches={matches} visible={visible}>
      <Top visible={visible} onToggle={handleToggle} />
      <ul className="flex flex-col gap-2 overflow-hidden px-4">
        <Item
          href={ROUTES.admin.dashboard}
          icon={
            <LayoutDashboardIcon
              size={24}
              className="shrink-0 [&_path]:stroke-current"
            />
          }
        >
          <Title visible={visible}>Dashboard</Title>
        </Item>
        <Item
          href={ROUTES.admin.categories}
          icon={
            <CategoryIcon className="size-6 shrink-0 [&_path]:fill-current" />
          }
        >
          <Title visible={visible}>Categories</Title>
        </Item>
      </ul>
    </Container>
  );
}
