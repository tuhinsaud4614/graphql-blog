import type { TableState, Updater } from "@tanstack/react-table";

import { FormControl } from "@/components/account";

interface Props {
  state: TableState;
  pageCount: number;
  setPageIndex: (updater: Updater<number>) => void;
}

export default function TPageSelector({
  state,
  pageCount,
  setPageIndex,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      Go to page:
      <FormControl
        type="number"
        className="w-[2.5625rem]"
        defaultValue={state.pagination.pageIndex + 1}
        onChange={(e) => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0;
          setPageIndex(Math.min(pageCount - 1, page));
        }}
      />
    </div>
  );
}
