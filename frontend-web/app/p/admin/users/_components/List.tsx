"use client";

import * as React from "react";

import Image from "next/image";

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
import { BadgeCheck, CircleDotDashed } from "lucide-react";

import DemoAvatar from "@/components/DemoAvatar";
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
import { AuthorStatus, FUserFragment } from "@/graphql/generated/schema";
import { FORMAT_LOCALE_DATE_VARIANTS } from "@/lib/constants";
import { formatLocaleDate, generateFileUrl, getUserName } from "@/lib/utils";

import AdminUserDelete from "./DeleteItem";
import AdminUserEdit from "./EditButton";

const MemoAdminUserDelete = React.memo(
  AdminUserDelete,
  (prev, curr) => prev.id === curr.id,
);
const MemoAdminUserEdit = React.memo(
  AdminUserEdit,
  (prev, curr) => prev.userId === curr.userId,
);

interface Props {
  users: FUserFragment[];
}

export default function AdminUserList({ users }: Props) {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const columns = React.useMemo<ColumnDef<FUserFragment>[]>(
    () => [
      {
        accessorKey: "id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="ID" />
        ),
        cell: ({ row }) => (
          <div className="text-start selection:bg-primary selection:text-primary-foreground">
            {row.index + 1}
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
          const imgUrl = generateFileUrl(row.original.avatar?.url);
          return (
            <div className="flex items-center gap-3">
              {imgUrl ? (
                <Image
                  loader={({ src, width, quality }) =>
                    `${src}?w=${width}&q=${quality || 75}`
                  }
                  src={imgUrl}
                  alt="Avatar"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <DemoAvatar as="span" className="h-10 w-10" size={40 / 1.8} />
              )}
              <span className="truncate text-sm font-medium selection:bg-primary selection:text-primary-foreground">
                {row.original.name}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => (
          <div className="text-start selection:bg-primary selection:text-primary-foreground">
            {row.original.email}
          </div>
        ),
        enableHiding: false,
      },
      {
        accessorKey: "mobile",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Mobile" />
        ),
        cell: ({ row }) => (
          <div className="text-start selection:bg-primary selection:text-primary-foreground">
            {row.original.mobile}
          </div>
        ),
        enableHiding: false,
      },
      {
        accessorKey: "authorStatus",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {row.original.authorStatus === AuthorStatus.Verified ? (
              <BadgeCheck className="text-success" size={16} />
            ) : (
              <CircleDotDashed className="text-warning" size={16} />
            )}
            <span className="selection:bg-primary selection:text-primary-foreground">
              {row.original.authorStatus}
            </span>
          </div>
        ),
        enableHiding: false,
      },
      {
        accessorKey: "updatedAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Modify At" />
        ),
        sortingFn: "datetime",
        cell: ({ row }) => {
          return (
            <div className="flex items-center selection:bg-primary selection:text-primary-foreground">
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
        cell: ({ row }) => {
          return (
            <div className="mx-auto flex w-fit items-center gap-2">
              <MemoAdminUserEdit
                userId={row.original.id}
                username={getUserName(row.original)}
              />
              <MemoAdminUserDelete
                id={row.original.id}
                username={getUserName(row.original)}
              />
            </div>
          );
        },
        enableSorting: false,
        enableHiding: false,
      },
    ],

    [],
  );

  const table = useReactTable({
    data: users,
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

  // const router = useRouter();
  // const pathname = usePathname();

  // const setQueryString = useSetQueryOnPage(pathname);

  // const limit = table.getState().pagination.pageSize;
  // const page = table.getState().pagination.pageIndex + 1;

  // React.useEffect(() => {
  //   router.replace(
  //     setQueryString({ page: page.toString(), limit: limit.toString() }),
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [page, limit, setQueryString]);

  return (
    <>
      <DataTableToolbar
        onSearch={setGlobalFilter}
        table={table}
        searchPlaceholder="Search users..."
      />
      <div className="mt-6 overflow-x-auto rounded-2xl shadow-mui scrollbar-hide dark:border dark:border-base-300">
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
                  No tags.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7}>
                <DataTablePagination dataLength={users.length} table={table} />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
}
