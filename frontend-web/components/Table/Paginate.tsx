import type { TableState, Updater } from "@tanstack/react-table";
import {
  BiChevronLeft,
  BiChevronRight,
  BiFirstPage,
  BiLastPage,
} from "react-icons/bi";

import { Button } from "@/components";

import { TablePageChanger, TablePageSelector } from "./PageSelector";

interface Props {
  setPageIndex: (updater: Updater<number>) => void;
  setPageSize: (updater: Updater<number>) => void;
  previousPage: () => void;
  nextPage: () => void;
  canNextPage: boolean;
  pageCount: number;
  state: TableState;
  dataLength: number;
  canPreviousPage: boolean;
}

export default function TablePaginate({
  setPageIndex,
  setPageSize,
  canPreviousPage,
  canNextPage,
  nextPage,
  previousPage,
  pageCount,
  state,
  dataLength,
}: Props) {
  const to = state.pagination.pageSize * (state.pagination.pageIndex + 1);
  const from = to + 1 - state.pagination.pageSize;
  return (
    <div className="flex items-center justify-end gap-3">
      <p className="shrink-0 text-sm text-neutral dark:text-neutral-dark">
        Rows per page:
      </p>
      <TablePageSelector
        pageSize={state.pagination.pageSize}
        setPage={setPageSize}
      />
      <p className="text-sm text-neutral dark:text-neutral-dark">
        {from}–{Math.min(to, dataLength)} of {dataLength}
      </p>
      <TablePageChanger
        value={state.pagination.pageIndex + 1}
        setPageIndex={setPageIndex}
        pageCount={pageCount}
      />

      <div className="flex items-center gap-2">
        <Button onClick={() => setPageIndex(0)} disabled={!canPreviousPage}>
          <BiFirstPage />
        </Button>
        <Button onClick={previousPage} disabled={!canPreviousPage}>
          <BiChevronLeft />
        </Button>
        <Button onClick={nextPage} disabled={!canNextPage}>
          <BiChevronRight />
        </Button>
        <Button
          type="button"
          aria-label="Last page"
          onClick={() => setPageIndex(pageCount - 1)}
          disabled={!canNextPage}
        >
          <BiLastPage />
        </Button>
      </div>
    </div>
  );
}
