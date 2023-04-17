import * as React from "react";

import classNames from "classnames";
import { motion } from "framer-motion";

import TabPanel from "./TabPanel";

const className = {
  list: "flex border-b dark:border-base-dark-300 space-x-4 relative overflow-x-auto scrollbar-hide",
  tabItem:
    "text-neutral dark:text-neutral-dark hover:text-primary-focus dark:hover:text-accent-dark border-none outline-none py-3 shrink-0 capitalize",
  slider:
    "rounded-full border-b border-[1.5px] border-primary dark:border-accent-dark absolute bottom-0 !m-0",
};

interface Props {
  tabs: string[] | Readonly<string[]>;
  children?: React.ReactNode;
  onTab?(index: number, key: string): void;
  selectedTab?: number;
}

export default function Tabs({
  tabs,
  children,
  onTab,
  selectedTab = 0,
}: Props) {
  const tabItemsRef = React.useRef(new Map<number, HTMLButtonElement | null>());
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [slider, setSlider] = React.useState({
    left: 0,
    right: 0,
    width: 0,
    hasValue: false,
  });

  React.useEffect(() => {
    const target = tabItemsRef.current.get(selectedTab);
    const container = containerRef.current;
    if (target && container) {
      const cRect = container.getBoundingClientRect();
      const tRect = target.getBoundingClientRect();
      const left = tRect.left - cRect.left;
      const right = cRect.right - tRect.right;

      setSlider({
        hasValue: true,
        width: tRect.width,
        left: left,
        right: right,
      });
    }
  }, [selectedTab]);

  return (
    <React.Fragment>
      <div className={className.list} ref={containerRef}>
        {tabs.map((text, index) => (
          <button
            className={classNames(
              className.tabItem,
              index === selectedTab && "!text-primary dark:!text-accent-dark",
            )}
            key={index}
            onClick={() => {
              onTab && onTab(index, text);
            }}
            aria-label={text}
            ref={(el) => tabItemsRef.current.set(index, el)}
          >
            {text}
          </button>
        ))}
        {slider.hasValue && (
          <motion.span
            transition={{ bounceDamping: 3 }}
            className={className.slider}
            style={{ left: slider.left, width: slider.width }}
          />
        )}
      </div>
      <TabPanel value={selectedTab}>{children}</TabPanel>
    </React.Fragment>
  );
}
