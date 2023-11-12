import * as React from "react";

import { Column } from "@tanstack/react-table";
import { Check, PlusCircle } from "lucide-react";

import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Menu from "../ui/Menu";
import MenuItem from "../ui/MenuItem";

interface Props<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
  }[];
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: Props<TData, TValue>) {
  const [anchorEle, setAnchorEle] = React.useState<null | HTMLButtonElement>(
    null,
  );
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <>
      <Button
        type="button"
        variant="primary"
        mode="outline"
        className="border-dashed px-3 py-2"
        onClick={(e) => {
          setAnchorEle(e.currentTarget);
        }}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        {title}
        {selectedValues?.size > 0 && (
          <>
            <span className="mx-2 h-4 w-[1px] shrink-0 bg-border" />
            <Badge
              variant="secondary"
              className="rounded-sm px-1 font-normal lg:hidden"
            >
              {selectedValues.size}
            </Badge>
            <div className="hidden space-x-1 lg:flex">
              {selectedValues.size > 2 ? (
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {selectedValues.size} selected
                </Badge>
              ) : (
                options
                  .filter((option) => selectedValues.has(option.value))
                  .map((option) => (
                    <Badge
                      variant="secondary"
                      key={option.value}
                      className="rounded-sm px-1 font-normal"
                    >
                      {option.label}
                    </Badge>
                  ))
              )}
            </div>
          </>
        )}
      </Button>
      <Menu
        open={Boolean(anchorEle)}
        anchorEle={anchorEle}
        onClose={() => setAnchorEle(null)}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        hideArrow
      >
        <div className="flex w-[12.5rem] flex-col">
          {options.map((option) => {
            const isSelected = selectedValues.has(option.value);
            return (
              <MenuItem
                key={option.label}
                onClick={() => {
                  if (isSelected) {
                    selectedValues.delete(option.value);
                  } else {
                    selectedValues.add(option.value);
                  }
                  const filterValues = Array.from(selectedValues);
                  column?.setFilterValue(
                    filterValues.length ? filterValues : undefined,
                  );
                }}
                className="flex items-center justify-between gap-2"
              >
                <span>{option.label}</span>

                {isSelected && <Check size={16} />}
              </MenuItem>
            );
          })}
          <hr className="border-neutral/75" />
          <MenuItem
            onClick={() => {
              column?.setFilterValue(undefined);
            }}
            className="flex items-center justify-between gap-2"
          >
            Clear filters
          </MenuItem>
        </div>
      </Menu>
    </>
  );
}
