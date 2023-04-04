import classNames from "classnames";
import * as React from "react";
import { BiChevronDown } from "react-icons/bi";

import { Accordion, AccordionDetails, AccordionSummary } from "@component";

interface Props {
  visible: boolean;
  expanded?: boolean;
  children: React.ReactNode;
  title: React.ReactNode;
}

export default function List({ expanded, visible, children, title }: Props) {
  return (
    <li className="w-auto max-w-full">
      <Accordion>
        <AccordionSummary
          expanded={expanded}
          className="w-full justify-between !shadow-none"
          expandIcon={(expand) => (
            <BiChevronDown
              className={classNames(
                "transition-transform duration-300",
                !visible && "xl:hidden xl:group-hover:block",
                expand && "-rotate-90",
              )}
              size={24}
            />
          )}
        >
          {title}
        </AccordionSummary>
        <AccordionDetails>
          <div
            className={classNames(
              "mt-2 gap-2",
              !visible && "xl:hidden xl:group-hover:block",
            )}
          >
            {children}
          </div>
        </AccordionDetails>
      </Accordion>
    </li>
  );
}
