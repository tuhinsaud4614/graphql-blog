"use client";

import * as React from "react";

import { Search } from "lucide-react";

import Input from "../ui/Input";

interface Props {
  setFilter(value: string): void;
  placeholder?: string;
  debounce?: number;
}

export default function DataTableSearch({
  debounce = 500,
  setFilter,
  placeholder,
}: Props) {
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setFilter(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, debounce]);
  return (
    <Input
      leftIcon={
        <Search size={16} className="mr-2 shrink-0 [&_path]:stroke-current" />
      }
      classes={{ root: "w-[9.375rem] lg:w-[15.625rem]" }}
      className="!text-left"
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
