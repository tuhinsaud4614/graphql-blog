import * as React from "react";

import type { SortDirection } from "@tanstack/react-table";
import classNames from "classnames";
import { BiChevronDown } from "react-icons/bi";

import { Button } from "@/components";
import header from "@/components/Layout/admin-layout/header";

interface Props extends React.ComponentProps<typeof Button> {
  sorted: false | SortDirection;
}

export default function TSort({ children, sorted, ...rest }: Props) {
  return (
    <Button {...rest}>
      {children}
      {
        <BiChevronDown
          size={20}
          className={classNames(
            "shrink-0 transition-transform duration-300",
            sorted === false && "invisible",
            sorted === "desc" && "-rotate-180",
          )}
        />
      }
    </Button>
  );
}
