"use client";

import * as React from "react";

import { Updater } from "@tanstack/react-table";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import Button from "../ui/Button";
import Input from "../ui/Input";
import Menu from "../ui/Menu";
import MenuItem from "../ui/MenuItem";

interface SelectorProps {
  pageSize: number;
  setPage: (value: number) => void;
}

export function DataTablePageSelector({ pageSize, setPage }: SelectorProps) {
  const [anchorEle, setAnchorEle] = React.useState<null | HTMLButtonElement>(
    null,
  );
  return (
    <>
      <Button
        type="button"
        mode="outline"
        className="w-max gap-2 px-2 py-1 text-sm"
        onClick={(e) => {
          setAnchorEle(e.currentTarget);
        }}
      >
        {pageSize}
        <ChevronsUpDown size={16} />
      </Button>
      <Menu
        open={Boolean(anchorEle)}
        anchorEle={anchorEle}
        onClose={() => setAnchorEle(null)}
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
        hideArrow
      >
        <div className="flex w-32 flex-col">
          {[5, 10, 15, 20].map((size) => (
            <MenuItem
              key={size}
              onClick={() => {
                setPage(size);
                setAnchorEle(null);
              }}
              className={cn(
                "flex items-center justify-between gap-2 dark:hover:bg-base-300",
                pageSize === size && "text-success",
              )}
            >
              {size}
              {pageSize === size && (
                <Check className="text-success" size={16} />
              )}
            </MenuItem>
          ))}
        </div>
      </Menu>
    </>
  );
}

interface ChangerProps {
  pageCount: number;
  value: number;
  setPageIndex: (updater: Updater<number>) => void;
}

export function TablePageChanger({
  pageCount,
  setPageIndex,
  value,
}: ChangerProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="whitespace-nowrap selection:bg-primary selection:text-primary-foreground">
        Go to page:
      </span>
      <Input
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
