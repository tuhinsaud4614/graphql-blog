"use client";

import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import Button from "../ui/Button";
import { DataTablePageSelector, TablePageChanger } from "./PageSelector";

interface Props<TData> {
  table: Table<TData>;
  dataLength: number;
}

export function DataTablePagination<TData>({
  table,
  dataLength,
}: Props<TData>) {
  const state = table.getState();
  const to = state.pagination.pageSize * (state.pagination.pageIndex + 1);
  const from = to + 1 - state.pagination.pageSize;
  return (
    <div className="flex flex-wrap items-center gap-4 px-2">
      <div className="whitespace-nowrap text-sm text-neutral/75 selection:bg-primary selection:text-primary-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="ml-auto flex flex-1 items-center justify-end gap-6 lg:gap-8">
        <div className="flex items-center gap-2">
          <div className="whitespace-nowrap text-sm font-medium selection:bg-primary selection:text-primary-foreground">
            Rows per page
          </div>
          <DataTablePageSelector
            pageSize={state.pagination.pageSize}
            setPage={table.setPageSize}
          />
        </div>
        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          <div className="whitespace-nowrap text-sm text-neutral selection:bg-primary selection:text-primary-foreground">
            {from}–{Math.min(to, dataLength)} of {dataLength}
          </div>
          <TablePageChanger
            value={state.pagination.pageIndex + 1}
            setPageIndex={table.setPageIndex}
            pageCount={table.getPageCount()}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            mode="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              table.setPageIndex(0);
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            mode="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            mode="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            mode="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              table.setPageIndex(table.getPageCount() - 1);
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
