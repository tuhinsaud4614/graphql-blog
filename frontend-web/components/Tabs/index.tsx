import classNames from "classnames";
import { motion } from "framer-motion";
import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import TabPanel from "./TabPanel";

const className = {
  list: "flex border-b space-x-4 space-y-4 relative overflow-x-auto scrollbar-hide",
  tabItem:
    "text-neutral hover:text-accent-focus border-none outline-none py-3 first:mt-4 shrink-0",
  slider: "h-0.5 rounded-tr-lg rounded-tl-lg mx-1 absolute bottom-0 bg-accent",
};

interface Props {
  tabs: string[];
  children?: ReactNode;
  onTab?(index: number, key: string): void;
}

export default function Tabs({ tabs, children, onTab }: Props) {
  const [value, setValue] = useState(0);
  const tabItemsRef = useRef(new Map<number, HTMLButtonElement | null>());
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [slider, setSlider] = useState({
    left: 0,
    right: 0,
    width: 0,
    hasValue: false,
  });

  useEffect(() => {
    const target = tabItemsRef.current.get(value);
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
  }, [value]);

  return (
    <Fragment>
      <div className={className.list} ref={containerRef}>
        {tabs.map((text, index) => (
          <button
            className={classNames(
              className.tabItem,
              index === value && "text-accent"
            )}
            key={index}
            onClick={() => {
              setValue(index);
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
            className="border-b border-[1.5px] border-neutral absolute bottom-0 !m-0"
            style={{ left: slider.left, width: slider.width }}
          />
        )}
      </div>
      <TabPanel value={value}>{children}</TabPanel>
    </Fragment>
  );
}
