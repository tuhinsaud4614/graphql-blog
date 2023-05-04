import * as React from "react";

import { BiSearch } from "react-icons/bi";

import { FormControl } from "@/components/account";
import { useDebounce } from "@/hooks";

interface Props {
  setFilter(value: string): void;
  placeholder?: string;
  debounce?: number;
}

export default function TFilter({
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
    <FormControl
      leftIcon={<BiSearch className="shrink-0 [&_path]:stroke-current" />}
      classes={{ box: "gap-2" }}
      className="!text-left"
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
