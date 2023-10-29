import { useContextSelector } from "use-context-selector";

import {
  AuthActionTypes,
  AuthDispatchContext,
  AuthStateContext,
} from "@/components/providers/context/authContext";
import { isDev } from "@/lib/isType";
import { useLogoutMutation } from "@/graphql/generated/schema";

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

/**
 * The `useAuthLogout` function is a custom hook that handles the logout functionality, including
 * dispatching actions and handling errors.
 * @returns The function `useAuthLogout` returns an object with the following properties:
 */
export default function useAuthLogout() {
  const dispatch = useAuthDispatch();
  const [logout, { loading, error, reset }] = useLogoutMutation({
    errorPolicy: "all",
  });

  async function logoutHandler() {
    try {
      await logout();
      dispatch({
        type: AuthActionTypes.setUser,
        payload: { token: null, user: null },
      });
    } catch (error) {
      isDev() && console.log("Logout error", error);
    }
  }

  return { logoutHandler, loading, error, reset } as const;
}
