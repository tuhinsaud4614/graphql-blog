import classNames from "classnames";
import { BiGridAlt } from "react-icons/bi";

import {
  adminSetSidebar,
  adminToggleSidebar,
  selectAdminSidebar,
} from "@features";
import { useMediaQuery } from "@hooks";
import { useAppDispatch, useAppSelector } from "store";
import Item from "./Item";
import ListItems from "./ListItems";
import MobileView from "./MobileView";
import Top from "./Top";

const className = {
  root: "fixed left-0 top-0 z-[1103] h-screen bg-primary",
};

export default function Sidebar() {
  const matches = useMediaQuery("(min-width: 1280px)");
  const visible = useAppSelector(selectAdminSidebar);
  const rdxDispatch = useAppDispatch();

  const content = (
    <>
      <Top
        visible={visible}
        onToggle={() => rdxDispatch(adminToggleSidebar())}
      />
      <ul className="flex flex-col gap-2 overflow-hidden px-4">
        <Item
          href="/admin"
          icon={<BiGridAlt size={24} className="[&_path]:fill-current" />}
        >
          Dashboard
        </Item>
        <ListItems
          items={[
            { href: "/admin/categories", title: "List" },
            { href: "/admin/categories/create", title: "Create" },
          ]}
        >
          Categories
        </ListItems>
      </ul>
    </>
  );

  if (matches) {
    return (
      <aside
        className={classNames(
          className.root,
          "group duration-200 ease-in",
          visible ? "w-[17.5rem]" : "w-[5.375rem] hover:w-[17.5rem]",
        )}
      >
        {content}
      </aside>
    );
  }

  return (
    <MobileView
      visible={visible}
      className={classNames(className.root, "w-[17.5rem]")}
      onClose={() => rdxDispatch(adminSetSidebar(false))}
    >
      {content}
    </MobileView>
  );
}
