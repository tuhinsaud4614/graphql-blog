import {
  ColumnDef,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import * as React from "react";
import {
  BiChevronDown,
  BiChevronLeft,
  BiChevronRight,
  BiFirstPage,
  BiLastPage,
  BiPencil,
  BiSearch,
  BiTrash,
} from "react-icons/bi";

import { Button } from "@component";
import { AdminLayout } from "components/Layout";
import { FormControl } from "components/account";
import { AdminCreateCategory } from "components/admin-categories";
import { Category } from "graphql/generated/schema";

const className = {
  table:
    "relative [&_th]:text-neutral dark:[&_th]:text-neutral-dark [&_td]:text-neutral dark:[&_td]:text-neutral-dark table text-left [&_th:first-child]:sticky [&_th:first-child]:left-0 [&_th:first-child]:z-10 [&_td]:whitespace-nowrap [&_td]:p-4 [&_td]:align-middle [&_tfoot_td]:bg-base-200 [&_tfoot_td]:text-sm [&_tfoot_td]:font-bold [&_tfoot_td]:uppercase dark:[&_tfoot_td]:bg-base-dark-200 [&_tfoot_th]:bg-base-200 [&_tfoot_th]:text-sm [&_tfoot_th]:font-bold [&_tfoot_th]:uppercase dark:[&_tfoot_th]:bg-base-dark-200 [&_th]:whitespace-nowrap [&_th]:p-4 [&_th]:align-middle [&_thead_td]:bg-base-200 [&_thead_td]:text-sm [&_thead_td]:font-bold [&_thead_td]:uppercase dark:[&_thead_td]:bg-base-dark-200 [&_thead_th]:bg-base-200 [&_thead_th]:text-sm [&_thead_th]:font-bold [&_thead_th]:uppercase dark:[&_thead_th]:bg-base-dark-200",
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
    },
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const to =
    getState().pagination.pageSize * (getState().pagination.pageIndex + 1);
  const from = to + 1 - getState().pagination.pageSize;

  return (
    <AdminLayout>
      <h1 className="mb-4 text-xl font-bold text-neutral dark:text-neutral-dark">
        Categories
      </h1>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <FormControl
            leftIcon={<BiSearch className="shrink-0 [&_path]:stroke-current" />}
            classes={{ box: "gap-2" }}
            className="!text-left"
            placeholder="Search Categories..."
          />
        </div>
        <AdminCreateCategory />
      </div>
      <div className="overflow-x-auto rounded-2xl bg-base-100 shadow-mui dark:bg-base-dark-200">
        <table className={classNames(className.table, "w-full")}>
          {/* head */}
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    <Button
                      className="gap-2"
                      mode="text"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {
                        <BiChevronDown
                          size={20}
                          className={classNames(
                            "shrink-0 transition-transform duration-300",
                            !header.column.getIsSorted() && "invisible",
                            header.column.getIsSorted() === "desc" &&
                              "-rotate-180",
                          )}
                        />
                      }
                    </Button>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className={classNames(className.tBody)}>
            {getRowModel().rows.map((row, i) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>
                <div className="flex items-center justify-end gap-3">
                  <p className="shrink-0 text-sm text-neutral dark:text-neutral-dark">
                    Rows per page:
                  </p>

                  <select
                    className="text-text-neutral focus:shadow-outline-indigo inline-flex flex-shrink-0 cursor-pointer select-none appearance-none items-center justify-center rounded-md border border-transparent bg-accent px-1 text-sm font-medium leading-5 shadow-sm transition duration-150 ease-in-out hover:bg-accent-focus focus:border-accent focus:outline-none dark:bg-accent-dark dark:text-neutral-dark sm:text-base sm:leading-6"
                    aria-label="rows per page"
                    value={getState().pagination.pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                    }}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                  </select>
                  <p className="text-sm text-neutral dark:text-neutral-dark">
                    {from}–{Math.min(to, data.length)} of {data.length}
                  </p>
                  <div className="flex items-center gap-2">
                    Go to page:
                    <FormControl
                      type="number"
                      className="w-[2.5625rem]"
                      defaultValue={getState().pagination.pageIndex + 1}
                      onChange={(e) => {
                        const page = e.target.value
                          ? Number(e.target.value) - 1
                          : 0;
                        setPageIndex(Math.min(getPageCount() - 1, page));
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setPageIndex(0)}
                      disabled={!getCanPreviousPage()}
                    >
                      <BiFirstPage />
                    </Button>
                    <Button
                      onClick={() => previousPage()}
                      disabled={!getCanPreviousPage()}
                    >
                      <BiChevronLeft />
                    </Button>
                    <Button
                      onClick={() => nextPage()}
                      disabled={!getCanNextPage()}
                    >
                      <BiChevronRight />
                    </Button>
                    <Button
                      type="button"
                      aria-label="Last page"
                      onClick={() => setPageIndex(getPageCount() - 1)}
                      disabled={!getCanNextPage()}
                    >
                      <BiLastPage />
                    </Button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </AdminLayout>
  );
}