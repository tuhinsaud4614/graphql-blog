import createOptimizeContext from "utils/optimize-context";

export const { Provider: AccordionProvider, userStore: useAccordionStore } =
  createOptimizeContext({ expand: false }, "Accordion");
