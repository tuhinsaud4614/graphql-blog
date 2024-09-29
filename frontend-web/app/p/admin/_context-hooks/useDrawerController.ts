import { useContextSelector } from "use-context-selector";

import { AdminDrawerControllerContext } from "@/app/p/admin/_context-hooks/adminDrawerControllerContext";

/**
 * The function "useAdminDrawerController" is a custom hook that returns the state from the
 * AdminDrawerControllerContext.
 * @returns the value of the `state` variable.
 */
export function useAdminDrawerController() {
  const state = useContextSelector(
    AdminDrawerControllerContext,
    (selector) => selector,
  );

  if (!state) {
    throw new Error(
      "useAdminDrawerController must be used within the AdminDrawerControllerProvider",
    );
  }

  return state;
}

/**
 * The function `useAdminDrawerControllerState` returns the value of `isOpen` from the
 * `AdminDrawerControllerContext` and throws an error if it is undefined.
 * @returns the value of the `isOpen` property from the `AdminDrawerControllerContext`.
 */
export function useAdminDrawerControllerState() {
  const isOpen = useContextSelector(
    AdminDrawerControllerContext,
    (selector) => selector.isOpen,
  );

  if (isOpen === undefined) {
    throw new Error(
      "useAdminDrawerControllerState must be used within the AdminDrawerControllerProvider",
    );
  }

  return isOpen;
}

/**
 * The function `useAdminDrawerControllerSetState` returns the `setIsOpen` function from the
 * `AdminDrawerControllerContext` and throws an error if it is used outside of the
 * `AdminDrawerControllerProvider`.
 * @returns the `setIsOpen` function from the `AdminDrawerControllerContext`.
 */
export function useAdminDrawerControllerSetState() {
  const setIsOpen = useContextSelector(
    AdminDrawerControllerContext,
    (selector) => selector.setIsOpen,
  );

  if (setIsOpen === undefined) {
    throw new Error(
      "useAdminDrawerControllerSetState must be used within the AdminDrawerControllerProvider",
    );
  }

  return setIsOpen;
}
