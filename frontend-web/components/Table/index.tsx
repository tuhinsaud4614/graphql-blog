/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import classNames from "classnames";

import { isDev } from "@/utils";

import TBody from "./Body";
import Filter from "./Filter";
import TPageSelector from "./PageSelector";
import TPaginate from "./Paginate";
import TFoot from "./TFoot";
import THead from "./THead";

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
  title: string;
  data: TData[];
  headers: ColumnDef<TData>[];
  addSection?: React.ReactNode;
  filterPlaceHolder?: string;
}

export default function Table<TData extends {}>({
  data,
  headers,
  title,
  addSection,
  filterPlaceHolder,
}: Props<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = React.useMemo<ColumnDef<TData>[]>(() => headers, []);
  const memoData = React.useMemo(() => data, []);

  const {
    getHeaderGroups,
    getRowModel,
    getState,
    setPageSize,
    getPageCount,
    setPageIndex,
    getCanNextPage,
    nextPage,
    previousPage,
    getCanPreviousPage,
  } = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: isDev(),
  });
  return (
    <>
      <h1 className="mb-4 text-xl font-bold text-neutral dark:text-neutral-dark">
        {title}
      </h1>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Filter
            placeholder={filterPlaceHolder}
            setFilter={(value) => setGlobalFilter(value)}
          />
        </div>
        {addSection}
      </div>
      <div className="overflow-x-auto rounded-2xl bg-base-100 shadow-mui dark:bg-base-dark-200">
        <table className={classNames(className.table, "w-full")}>
          <THead headers={getHeaderGroups()} />
          <TBody rowModel={getRowModel()} />
          <TFoot>
            <TPageSelector
              pageCount={getPageCount()}
              setPageIndex={setPageIndex}
              state={getState()}
            />
            <TPaginate
              canNextPage={getCanNextPage()}
              canPreviousPage={getCanPreviousPage()}
              nextPage={nextPage}
              pageCount={getPageCount()}
              previousPage={previousPage}
              setPageIndex={setPageIndex}
            />
          </TFoot>
        </table>
      </div>
    </>
  );
}
