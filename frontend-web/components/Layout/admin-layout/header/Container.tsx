import classNames from "classnames";
import * as React from "react";

import { selectAdminSidebar } from "@features";
import { useMediaQuery } from "@hooks";
import { useAppSelector } from "store";

export default function Container({ children }: React.PropsWithChildren) {
  const matches = useMediaQuery("(min-width: 1280px)");
  const visible = useAppSelector(selectAdminSidebar);
  return (
    <header
      className={classNames(
        "sticky left-auto top-0 z-[1100] bg-base-200 py-4 shadow-mui dark:bg-base-dark-200",
        matches && !visible && "ml-[5.375rem]",
      )}
    >
      {children}
    </header>
  );
}
