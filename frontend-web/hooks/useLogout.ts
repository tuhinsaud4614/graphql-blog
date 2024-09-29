import * as React from "react";

import { signOut } from "next-auth/react";

import { useLogoutMutation } from "@/graphql/generated/schema";
import { ROUTES } from "@/lib/constants";
import { isDev } from "@/lib/isType";

export default function useLogout() {
  const [loading, setLoading] = React.useState(false);
  const [logout, { error, reset }] = useLogoutMutation({
    errorPolicy: "all",
  });

  const clickHandler = async () => {
    try {
      setLoading(true);
      await signOut({ callbackUrl: ROUTES.landing, redirect: true });
      await logout();
    } catch (error) {
      isDev() && console.error("Logout errors: ", error);
    } finally {
      setLoading(false);
    }
  };

  const resetHandler = () => reset();

  return {
    logoutHandler: clickHandler,
    reset: resetHandler,
    loading,
    error,
  } as const;
}
