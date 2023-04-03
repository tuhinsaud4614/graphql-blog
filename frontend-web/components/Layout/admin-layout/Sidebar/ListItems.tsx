import classNames from "classnames";
import type { LinkProps } from "next/link";
import * as React from "react";
import { BiCategory, BiChevronDown } from "react-icons/bi";

import { Accordion, AccordionDetails, AccordionSummary } from "@component";
import ListItem from "./ListItem";

interface Props {
  items: {
    href: LinkProps["href"];
    title: string;
  }[];
  children: React.ReactNode;
}

export default function ListItems({ items, children }: Props) {
  return (
    <li className="w-auto max-w-full">
      <Accordion className="">
        <AccordionSummary
          className="w-full justify-between"
          expandIcon={(expand) => (
            <BiChevronDown
              className={classNames(
                "du transition-transform duration-300 xl:hidden xl:group-hover:block",
                expand && "-rotate-90",
              )}
              size={24}
            />
          )}
        >
          <div className="flex items-center gap-2 capitalize">
            <BiCategory size={24} className="[&_path]:fill-current" />
            <span className="duration-300 xl:hidden xl:group-hover:block">
              {children}
            </span>
          </div>
        </AccordionSummary>
        <AccordionDetails className="duration-300 xl:hidden xl:group-hover:block">
          {items.map((item) => (
            <ListItem key={item.title} href={item.href}>
              {item.title}
            </ListItem>
          ))}
        </AccordionDetails>
      </Accordion>
    </li>
  );
}
