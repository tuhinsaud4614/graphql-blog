import * as React from "react";

import type { ColumnDef } from "@tanstack/react-table";
import classNames from "classnames";
import { BiPencil, BiTrash } from "react-icons/bi";

import { Button } from "@/components";

const className = {
  table:
    "table relative text-left [&_th]:text-neutral dark:[&_th]:text-neutral-dark [&_td]:text-neutral dark:[&_td]:text-neutral-dark [&_th:first-child]:sticky [&_th:first-child]:left-0 [&_th:first-child]:z-10 [&_td]:whitespace-nowrap [&_td]:p-4 [&_td]:align-middle [&_th]:whitespace-nowrap [&_th]:p-4 [&_th]:align-middle",
  thead:
    "[&_td]:bg-base-200 [&_td]:text-sm [&_td]:font-bold [&_td]:uppercase dark:[&_td]:bg-base-dark-200 [&_th]:bg-base-200 [&_th]:text-sm [&_th]:font-bold [&_th]:uppercase dark:[&_th]:bg-base-dark-200",
  tBody:
    "[&_td]:bg-base-100 dark:[&_td]:bg-base-dark-100 [&_th]:bg-base-100 dark:[&_th]:bg-base-dark-100 [&_tr:not(:last-child)_th]:border-b [&_tr:not(:last-child)_th]:border-base-200 dark:[&_tr:not(:last-child)_th]:border-base-dark-200 [&_tr:not(:last-child)_td]:border-b [&_tr:not(:last-child)_td]:border-base-200 dark:[&_tr:not(:last-child)_td]:border-base-dark-200",
  tfoot:
    "[&_td]:bg-base-200 [&_td]:text-sm [&_td]:font-bold [&_td]:uppercase dark:[&_td]:bg-base-dark-200 [&_th]:bg-base-200 [&_th]:text-sm [&_th]:font-bold [&_th]:uppercase dark:[&_th]:bg-base-dark-200",
};

interface Props<TData extends {}> {
  data: TData[];
  headers: (keyof TData)[];
}

export default function Table<TData extends {}>({
  data,
  headers,
}: Props<TData>) {
  const columns = React.useMemo<ColumnDef<TData>[]>(
    () => [
      ...headers.map((header) => ({
        header: header,
        accessorKey: header,
        id: header,
      })),
      {
        header: "Actions",
        cell(info) {
          return (
            <div className="flex items-center gap-2">
              <Button
                variant="warning"
                onClick={() => console.log(info.row.original.id)}
                circle
              >
                <BiPencil />
              </Button>
              <Button
                variant="error"
                onClick={() => console.log(info.row.original.id)}
                circle
              >
                <BiTrash />
              </Button>
            </div>
          );
        },
      },
    ],

    [],
  );
  return (
    <div className="overflow-x-auto rounded-2xl bg-base-100 shadow-mui dark:bg-base-dark-200">
      <table className={classNames(className.table, "w-full")}></table>
    </div>
  );
}
