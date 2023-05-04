import type { Updater } from "@tanstack/react-table";
import {
  BiChevronLeft,
  BiChevronRight,
  BiFirstPage,
  BiLastPage,
} from "react-icons/bi";

import { Button } from "@/components";

interface Props {
  setPageIndex: (updater: Updater<number>) => void;
  canPreviousPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
  canNextPage: boolean;
  pageCount: number;
}

export default function TPaginate({
  setPageIndex,
  canPreviousPage,
  canNextPage,
  nextPage,
  previousPage,
  pageCount,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <Button onClick={() => setPageIndex(0)} disabled={!canPreviousPage}>
        <BiFirstPage />
      </Button>
      <Button onClick={previousPage} disabled={!canPreviousPage}>
        <BiChevronLeft />
      </Button>
      <Button onClick={nextPage} disabled={canNextPage}>
        <BiChevronRight />
      </Button>
      <Button
        type="button"
        aria-label="Last page"
        onClick={() => setPageIndex(pageCount - 1)}
        disabled={canNextPage}
      >
        <BiLastPage />
      </Button>
    </div>
  );
}
