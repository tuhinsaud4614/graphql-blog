import * as React from "react";

import { motion } from "framer-motion";

const className = {
  root: "flex flex-col overflow-hidden w-full",
  container: "flex will-change-transform min-h-0 flex-1",
  page: "flex flex-col w-full self-stretch shrink-0 h-full overflow-hidden outline-none",
};

interface Props {
  children: React.ReactNode;
  value: number;
}

export default function TabPanel({ children, value }: Props) {
  return (
    <section className={className.root}>
      <motion.div
        className={className.container}
        transition={{
          tension: 190,
          friction: 70,
          mass: 0.4,
        }}
        initial={false}
        animate={{ x: `${value * -100}%` }}
      >
        {React.Children.map(children, (child, i) => (
          <div
            className={className.page}
            key={i}
            aria-hidden={value !== i}
            tabIndex={value === i ? 0 : -1}
          >
            {child}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
