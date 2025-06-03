import type { Updater } from "@tanstack/react-table";

import { FormControl } from "@/components/account";

interface Props {
  pageCount: number;
  value: number;
  setPageIndex: (updater: Updater<number>) => void;
}

export function TablePageChanger({ pageCount, setPageIndex, value }: Props) {
  return (
    <div className="flex items-center gap-2">
      Go to page:
      <FormControl
        type="number"
        className="w-[2.5625rem]"
        value={value}
        onChange={(e) => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0;
          setPageIndex(Math.min(pageCount - 1, page));
        }}
      />
    </div>
  );
}

interface SelectorProps {
  pageSize: number;
  setPage: (value: number) => void;
}

export function TablePageSelector({ pageSize, setPage }: SelectorProps) {
  return (
    <select
      className="inline-flex min-w-[3rem] shrink-0 cursor-pointer select-none appearance-none items-center justify-center rounded-md border border-transparent bg-accent px-1 text-sm font-medium leading-5 text-neutral shadow-sm transition duration-150 ease-in-out hover:bg-accent-focus focus:border-accent focus:outline-none sm:text-base sm:leading-6"
      aria-label="rows per page"
      value={pageSize}
      onChange={(e) => {
        setPage(Number(e.target.value));
      }}
    >
      {[5, 10, 15, 20].map((r) => (
        <option key={r} value={r}>
          Show {r}
        </option>
      ))}
    </select>
  );
}
