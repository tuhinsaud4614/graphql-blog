import classNames from "classnames";
import * as React from "react";
import { BiCategory, BiChevronDown } from "react-icons/bi";

import { Accordion, AccordionDetails, AccordionSummary } from "@component";

interface Props {
  visible: boolean;
  children: React.ReactNode;
  title: React.ReactNode;
}

export default function List({ visible, children, title }: Props) {
  return (
    <li className="w-auto max-w-full">
      <Accordion>
        <AccordionSummary
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
          <div className="flex items-center gap-2 capitalize">
            <BiCategory size={24} className="[&_path]:fill-current" />
            {title}
          </div>
        </AccordionSummary>
        <AccordionDetails
          className={classNames(
            "mt-2 gap-2",
            !visible && "xl:hidden xl:group-hover:block",
          )}
        >
          {children}
        </AccordionDetails>
      </Accordion>
    </li>
  );
}
