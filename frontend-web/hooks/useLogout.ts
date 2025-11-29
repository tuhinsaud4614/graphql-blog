import * as React from "react";

import { useRouter } from "next/navigation";

import { useLocalStorage } from "usehooks-ts";

import { SignOutParams } from "@/components/providers/SessionProvider";
import { useLogoutMutation } from "@/graphql/generated/schema";
import { destroySession } from "@/lib/actions";
import { KEYS } from "@/lib/constants";
import { isDev } from "@/lib/isType";

export default function useLogout() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [, setPersist] = useLocalStorage(
    KEYS.LOCAL_STORAGE_KEYS.persist,
    false,
  );
  const [logout, { error, reset }] = useLogoutMutation({
    errorPolicy: "all",
  });

  const signOut = async <R extends boolean = true>(
    options?: SignOutParams<R>,
  ): Promise<boolean | void> => {
    const {
      redirect = true,
      redirectTo = options?.redirectTo ?? window.location.href,
    } = options ?? {};

    const res = await destroySession();

    if (res) {
      setPersist(false);
    }

    if (redirect) {
      const url = redirectTo;
      window.location.href = url;
      // If url contains a hash, the browser does not reload the page. We reload manually
      if (url.includes("#")) window.location.reload();
      return;
    }
    return !!res;
  };

  const clickHandler = async <R extends boolean = true>(
    options?: SignOutParams<R>,
  ) => {
    try {
      setLoading(true);
      await signOut(options);
      await logout();
      router.refresh();
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
