import React from "react";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { BiPencil, BiTrash } from "react-icons/bi";

import { Category } from "@/graphql/generated/schema";
import { isDev } from "@/utils";

import Button from "../Button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../Table";
import TableFilter from "../Table/Filter";
import TablePaginate from "../Table/Paginate";
import TableSort from "../Table/Sort";

type ICategory = Pick<Category, "id" | "title" | "updatedAt">;

interface Props {
  categories: ICategory[];
  children: React.ReactNode;
}

export default function AdminCategories({ categories, children }: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = React.useMemo<ColumnDef<ICategory>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        cell(info) {
          return info.row.index + 1;
        },
      },
      {
        header: "Title",
        accessorKey: "title",
        cell(info) {
          return info.getValue();
        },
      },
      {
        header: "Modify at",
        accessorKey: "updatedAt",
        cell(info) {
          return info.getValue();
        },
      },
      {
        header: "Actions",
        cell(info) {
          return (
            <div className="mx-auto flex w-fit items-center gap-2">
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
    data: categories,
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
        Categories
      </h1>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <TableFilter
            placeholder="Search Categories..."
            setFilter={(value) => setGlobalFilter(value)}
          />
        </div>
        {children}
      </div>
      <div className="overflow-x-auto rounded-2xl bg-base-100 shadow-mui dark:bg-base-dark-100">
        <Table>
          <TableHeader>
            {getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    <TableSort
                      className="mx-auto gap-2"
                      mode="text"
                      onClick={header.column.getToggleSortingHandler()}
                      sorted={header.column.getIsSorted()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </TableSort>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {getRowModel().rows.map((row, i) => (
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
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
                <TablePaginate
                  state={getState()}
                  pageCount={getPageCount()}
                  dataLength={categories.length}
                  setPageSize={setPageSize}
                  setPageIndex={setPageIndex}
                  nextPage={nextPage}
                  previousPage={previousPage}
                  canPreviousPage={getCanPreviousPage()}
                  canNextPage={getCanNextPage()}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
}
