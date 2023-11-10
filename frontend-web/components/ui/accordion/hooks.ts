import { useContextSelector } from "use-context-selector";

import { AccordionContext } from "./context";

/**
 * The useAccordion function is a custom hook that returns the state from the AccordionContext.
 * @returns The `state` variable is being returned.
 */
export function useAccordion() {
  const state = useContextSelector(AccordionContext, (selector) => selector);

  if (!state) {
    throw new Error("useAccordion must be used within the AccordionProvider");
  }

  return state;
}

/**
 * The function `useAccordionState` returns the value of `isExpanded` from the `AccordionContext` and
 * throws an error if it is used outside of the `AccordionProvider`.
 * @returns the value of `isExpanded` which is obtained from the `AccordionContext`.
 */
export function useAccordionState() {
  const isExpanded = useContextSelector(
    AccordionContext,
    (selector) => selector.isExpanded,
  );

  if (isExpanded === undefined) {
    throw new Error(
      "useAccordionState must be used within the AccordionProvider",
    );
  }

  return isExpanded;
}

/**
 * The function `useAccordionSetState` returns the `setIsExpanded` function from the `AccordionContext`
 * and throws an error if it is not used within the `AccordionProvider`.
 * @returns the `setIsExpanded` function.
 */
export function useAccordionSetState() {
  const setIsExpanded = useContextSelector(
    AccordionContext,
    (selector) => selector.setIsExpanded,
  );

  if (setIsExpanded === undefined) {
    throw new Error(
      "useAccordionSetState must be used within the AccordionProvider",
    );
  }

  return setIsExpanded;
}
