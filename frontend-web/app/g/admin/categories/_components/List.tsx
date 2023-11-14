"use client";

import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import TableBody from "@/components/data-table/Body";
import TableCell from "@/components/data-table/Cell";
import { DataTableColumnHeader } from "@/components/data-table/ColumnHeader";
import TableFooter from "@/components/data-table/Footer";
import TableHead from "@/components/data-table/Head";
import TableHeader from "@/components/data-table/Header";
import { DataTablePagination } from "@/components/data-table/Pagination";
import TableRow from "@/components/data-table/Row";
import Table from "@/components/data-table/Table";
import { DataTableToolbar } from "@/components/data-table/Toolbar";
import { Category } from "@/graphql/generated/schema";
import { FORMAT_LOCALE_DATE_VARIANTS } from "@/lib/constants";
import { formatLocaleDate } from "@/lib/utils";

import AdminCategoryDelete from "./DeleteItem";
import AdminCategoryEdit from "./EditButton";

type ICategory = Pick<Category, "id" | "title" | "updatedAt">;

interface Props {
  categories: ICategory[];
  children: React.ReactNode;
}

export default function AdminCategoryList({ categories, children }: Props) {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const columns = React.useMemo<ColumnDef<ICategory>[]>(
    () => [
      {
        accessorKey: "id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="ID" />
        ),
        cell: ({ row }) => <div className="text-start">{row.index + 1}</div>,
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "title",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => {
          return (
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("title")}
            </span>
          );
        },
      },
      {
        accessorKey: "updatedAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Modify At" />
        ),
        sortingFn: "datetime",
        cell: ({ row }) => {
          return (
            <div className="flex items-center">
              {formatLocaleDate(
                row.getValue("updatedAt"),
                FORMAT_LOCALE_DATE_VARIANTS.a,
              )}
            </div>
          );
        },
      },
      {
        id: "actions",
        header: ({ column }) => (
          <DataTableColumnHeader
            className="text-center"
            column={column}
            title="Actions"
          />
        ),
        cell: ({ row }) => (
          <div className="mx-auto flex w-fit items-center gap-2">
            <AdminCategoryEdit
              categoryId={row.original.id}
              oldTitle={row.original.title}
            />
            <AdminCategoryDelete
              id={row.original.id}
              title={row.original.title}
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ],

    [],
  );

  const table = useReactTable({
    data: categories,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <>
      <DataTableToolbar
        onSearch={setGlobalFilter}
        table={table}
        searchPlaceholder="Search Categories..."
        outerChildren={children}
      />
      <div className="mt-6 overflow-x-auto rounded-2xl shadow-mui scrollbar-hide dark:border">
        <Table>
          <TableHeader className="bg-base-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-base-100">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell, index) => {
                    if (index === 0) {
                      return (
                        <TableHead key={cell.id} className="!text-center">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableHead>
                      );
                    }
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No categories.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
                <DataTablePagination
                  dataLength={categories.length}
                  table={table}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
}
