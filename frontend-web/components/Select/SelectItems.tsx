import * as React from "react";

import { motion } from "framer-motion";

import { UnSelectedItem } from "./SelectItem";

const className = {
  root: "absolute z-10 top-full left-0 right-0 shadow-mine !ml-0 !mt-2 rounded overflow-y-auto bg-base-100 dark:bg-base-dark-200",
  items: "list-none m-0 flex-col max-h-48 py-1",
};

interface Props {
  loading?: boolean;
  length: number;
  children: React.ReactNode;
}

const SelectItems = React.forwardRef<HTMLDivElement, Props>(
  ({ children, length, loading }, ref) => {
    let loadedItems = children;
    if (loading) {
      loadedItems = <UnSelectedItem>Loading...</UnSelectedItem>;
    } else if (length === 0) {
      loadedItems = <UnSelectedItem>No options</UnSelectedItem>;
    }
    return (
      <motion.section
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={className.root}
        ref={ref}
      >
        <ul className={className.items}>{loadedItems}</ul>
      </motion.section>
    );
  },
);

SelectItems.displayName = "SelectItems";

export default SelectItems;
