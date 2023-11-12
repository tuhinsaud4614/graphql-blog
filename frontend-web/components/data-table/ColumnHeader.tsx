"use client";

import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import DataTableSort from "./Sort";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <div
        className={cn(
          "font-title font-medium capitalize text-primary selection:bg-primary selection:text-primary-foreground lg:text-base",
          className,
        )}
      >
        {title}
      </div>
    );
  }

  return (
    <DataTableSort
      mode="text"
      variant="primary"
      className={cn(
        "font-title font-medium capitalize lg:text-base",
        className,
      )}
      sorted={column.getIsSorted()}
      onClick={column.getToggleSortingHandler()}
    >
      {title}
    </DataTableSort>
  );
}
