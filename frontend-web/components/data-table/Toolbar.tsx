"use client";

import * as React from "react";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import Button from "../ui/Button";
import DataTableSearch from "./Search";

interface Props<TData> {
  table: Table<TData>;
  searchPlaceholder?: string;
  children?: React.ReactNode;
  outerChildren?: React.ReactNode;
  onSearch(value: string): void;
}

export function DataTableToolbar<TData>({
  table,
  searchPlaceholder,
  children,
  outerChildren,
  onSearch,
}: Props<TData>) {
  const isFiltered = !!children && table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <DataTableSearch placeholder={searchPlaceholder} setFilter={onSearch} />
        {children}
        {isFiltered && (
          <Button
            mode="text"
            type="button"
            onClick={() => {
              table.resetColumnFilters();
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {outerChildren}
    </div>
  );
}
