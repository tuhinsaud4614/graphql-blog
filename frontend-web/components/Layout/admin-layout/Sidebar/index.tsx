import classNames from "classnames";
import * as React from "react";
import { BiGridAlt } from "react-icons/bi";

import { ROUTES } from "@constants";
import {
  adminSetSidebar,
  adminToggleSidebar,
  selectAdminSidebar,
} from "@features";
import { useMediaQuery } from "@hooks";
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
          icon={<BiGridAlt size={24} className="[&_path]:fill-current" />}
        >
          <Title visible={visible}>Dashboard</Title>
        </Item>
        <List
          visible={visible}
          title={<Title visible={visible}>Categories</Title>}
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
