import classNames from "classnames";
import { useRouter } from "next/router";
import * as React from "react";
import { MdDashboard } from "react-icons/md";

import { ROUTES } from "@constants";
import {
  adminSetSidebar,
  adminToggleSidebar,
  selectAdminSidebar,
} from "@features";
import { useMediaQuery } from "@hooks";
import { BiCategory } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "store";
import Container from "./Container";
import Item from "./Item";
import List from "./List";
import SubItem from "./SubItem";
import Top from "./Top";

function Title({
  visible,
  children,
}: React.PropsWithChildren<{ visible: boolean }>) {
  return (
    <span
      className={classNames(
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
  const visible = useAppSelector(selectAdminSidebar);
  const rdxDispatch = useAppDispatch();

  const handleToggle = () => rdxDispatch(adminToggleSidebar());

  const handleClose = () => rdxDispatch(adminSetSidebar(false));

  return (
    <Container onClose={handleClose} matches={matches} visible={visible}>
      <Top visible={visible} onToggle={handleToggle} />
      <ul className="flex flex-col gap-2 overflow-hidden px-4">
        <Item
          href={ROUTES.admin.dashboard}
          icon={
            <MdDashboard
              size={24}
              className="shrink-0 [&_path]:stroke-current"
            />
          }
        >
          <Title visible={visible}>Dashboard</Title>
        </Item>
        <List
          title={
            <div className="flex items-center gap-2 capitalize">
              <BiCategory
                size={24}
                className="shrink-0 [&_path]:fill-current"
              />
              <Title visible={visible}>Categories</Title>
            </div>
          }
          expanded={asPath.startsWith(ROUTES.admin.categories)}
          visible={visible}
        >
          {[
            { href: ROUTES.admin.categories, title: "List" },
            { href: ROUTES.admin.createCategory, title: "Create" },
          ].map((item) => (
            <SubItem key={item.title} href={item.href}>
              {item.title}
            </SubItem>
          ))}
        </List>
      </ul>
    </Container>
  );
}
