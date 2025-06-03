import createOptimizeContext from "@/context/optimize-context";

export const { Provider: AccordionProvider, userStore: useAccordionStore } =
  createOptimizeContext({ expand: false }, "Accordion");
