import { useContextSelector } from "use-context-selector";

import {
  AuthDispatchContext,
  AuthStateContext,
} from "@/components/providers/context/authContext";

/**
 * The `useAuthDispatch` function returns the dispatch function from the `AuthDispatchContext` and
 * throws an error if the dispatch function is not found.
 * @returns the `dispatch` function from the `AuthDispatchContext`.
 */
export function useAuthDispatch() {
  const dispatch = useContextSelector(
    AuthDispatchContext,
    (selector) => selector,
  );

  if (!dispatch) {
    throw new Error("Auth Action Dispatch not found!");
  }

  return dispatch;
}

/**
 * The `useAuthUser` function returns the user object from the `AuthStateContext`.
 * @returns The `useAuthUser` function returns the `user` object obtained from the `AuthStateContext`.
 */
export function useAuthUser() {
  const user = useContextSelector(
    AuthStateContext,
    (selector) => selector.user,
  );
  return user;
}
