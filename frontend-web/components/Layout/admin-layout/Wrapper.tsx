import classNames from "classnames";
import * as React from "react";

import { selectAdminSidebar } from "@features";
import { useMediaQuery } from "@hooks";
import { useAppSelector } from "store";

export default function Wrapper({ children }: React.PropsWithChildren) {
  const matches = useMediaQuery("(min-width: 1280px)");
  const visible = useAppSelector(selectAdminSidebar);
  return (
    <div
      className={classNames(
        "transition-all duration-300",
        matches && visible && "xl:ml-[17.5rem]",
      )}
    >
      {children}
    </div>
  );
}
