import classNames from "classnames";
import * as React from "react";

import { selectAdminSidebar } from "@features";
import { useAppSelector } from "store";

export default function Wrapper({ children }: React.PropsWithChildren) {
  const visible = useAppSelector(selectAdminSidebar);
  return (
    <header
      className={classNames(
        "sticky left-auto top-0 z-[1100] bg-base-200 py-4 shadow-mui dark:bg-base-dark-200",
        !visible && "xl:ml-[5.375rem]",
      )}
    >
      {children}
    </header>
  );
}
