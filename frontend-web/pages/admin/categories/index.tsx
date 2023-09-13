import * as React from "react";

import {
  ColumnDef,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { BiPencil, BiTrash } from "react-icons/bi";

import { Button } from "@/components";
import { AdminLayout } from "@/components/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";
import TableFilter from "@/components/Table/Filter";
import TablePaginate from "@/components/Table/Paginate";
import TableSort from "@/components/Table/Sort";
import { AdminCreateCategory } from "@/components/admin-categories";
import { Category } from "@/graphql/generated/schema";
import { isDev } from "@/utils";

const className = {
  table:
    "relative [&_th]:text-neutral dark:[&_th]:text-neutral-dark [&_td]:text-neutral dark:[&_td]:text-neutral-dark table text-left [&_th:first-child]:sticky [&_th:first-child]:left-0 [&_th:first-child]:z-10 [&_td]:whitespace-nowrap [&_td]:p-4 [&_td]:align-middle [&_tfoot_td]:bg-base-200 [&_tfoot_td]:text-sm [&_tfoot_td]:font-bold [&_tfoot_td]:uppercase dark:[&_tfoot_td]:bg-base-dark-200 [&_tfoot_th]:bg-base-200 [&_tfoot_th]:text-sm [&_tfoot_th]:font-bold [&_tfoot_th]:uppercase dark:[&_tfoot_th]:bg-base-dark-200 [&_th]:whitespace-nowrap [&_th]:p-4 [&_th]:align-middle [&_thead_td]:bg-base-200 [&_thead_td]:text-sm [&_thead_td]:font-bold [&_thead_td]:uppercase dark:[&_thead_td]:bg-base-dark-200 [&_thead_th]:bg-base-200 [&_thead_th]:text-sm [&_thead_th]:font-bold [&_thead_th]:uppercase dark:[&_thead_th]:bg-base-dark-200 dark:border dark:border-base-dark-200",
  tBody:
    "[&_td]:bg-base-100 dark:[&_td]:bg-base-dark-100 [&_th]:bg-base-100 dark:[&_th]:bg-base-dark-100 [&_tr:not(:last-child)_th]:border-b [&_tr:not(:last-child)_th]:border-base-200 dark:[&_tr:not(:last-child)_th]:border-base-dark-200 [&_tr:not(:last-child)_td]:border-b [&_tr:not(:last-child)_td]:border-base-200 dark:[&_tr:not(:last-child)_td]:border-base-dark-200",
};

const categories = [
  {
    id: "1",
    title: "Category 1",
    updatedAt: "2023-04-07T17:47:45.978Z",
  },
  {
    id: "2",
    title: "Category 2",
    updatedAt: "2023-04-07T17:47:45.978Z",
  },
  {
    id: "3",
    title: "Category 3",
    updatedAt: "2023-04-07T17:47:45.978Z",
  },
  {
    id: "4",
    title: "Category 4",
    updatedAt: "2023-04-07T17:47:45.978Z",
  },
  {
    id: "5",
    title: "Category 5",
    updatedAt: "2023-04-07T17:47:45.978Z",
  },
  {
    id: "6",
    title: "Category 6",
    updatedAt: "2023-04-07T17:47:45.978Z",
  },
];

type ICategory = Pick<Category, "id" | "title" | "updatedAt">;

const columnHelper =
  createColumnHelper<Pick<Category, "id" | "title" | "updatedAt">>();

export default function Categories() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = React.useMemo<ColumnDef<ICategory>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        cell(info) {
          return info.getValue();
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
        header: "Created at",
        accessorKey: "updatedAt",
        cell(info) {
          return info.getValue();
        },
      },
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

  const data = React.useMemo(() => categories, []);
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
    <AdminLayout>
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
        <AdminCreateCategory />
      </div>
      <div className="overflow-x-auto rounded-2xl bg-base-100 shadow-mui dark:bg-base-dark-100">
        <Table>
          <TableHeader>
            {getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    <TableSort
                      className="gap-2"
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
                      <TableHead key={cell.id}>
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
                  dataLength={data.length}
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
    </AdminLayout>
  );
}
