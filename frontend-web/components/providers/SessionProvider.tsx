"use client";

import * as React from "react";

import { createContext, useContextSelector } from "use-context-selector";
import { useLocalStorage } from "usehooks-ts";

import { getSession } from "@/lib/actions";
import { KEYS, REFRESH_TOKEN_ERROR } from "@/lib/constants";
import { isDev } from "@/lib/isType";
import { IAuthUser } from "@/lib/types";
import { getAuthUser } from "@/lib/utils";

export interface SignOutParams<Redirect extends boolean = true> {
  redirectTo?: string;
  redirect?: Redirect;
}

export type Session = {
  accessToken?: string;
  error?: string;
  expires?: string;
  user?: IAuthUser;
};
export type UpdateSession = (data: Session | null) => Session | null;

export interface UseSessionOptions {
  /** Defaults to `signIn` */
  onUnauthenticated?: () => void;
}

export type SessionContextValue =
  | { update: UpdateSession; data: Session; status: "authenticated" }
  | {
      update: UpdateSession;
      data: null;
      status: "unauthenticated" | "loading";
    };

const SessionContext = createContext<SessionContextValue | undefined>(
  undefined,
);

interface Props {
  children: React.ReactNode;
  session?: Session | null;
}

export default function SessionProvider({ children, session }: Props) {
  const effectRan = React.useRef<boolean>(true);
  const [isPersisted, setIsPersist] = useLocalStorage(
    KEYS.LOCAL_STORAGE_KEYS.persist,
    false,
  );
  const [sessionState, setSessionState] = React.useState(() => session);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (effectRan.current) {
      const verifyRefreshToken = async () => {
        try {
          setLoading(true);
          const session = await getSession();
          setLoading(false);
          const user = getAuthUser(session?.accessToken);
          if (user && session?.accessToken) {
            setIsPersist(true);
            setSessionState({
              accessToken: session.accessToken,
              user,
              expires: new Date(user.exp * 1000).toISOString(),
            });
          } else {
            setIsPersist(false);
            setSessionState?.({ error: REFRESH_TOKEN_ERROR });
          }
        } catch (error) {
          // Log the error if it's in dev mode
          isDev() &&
            console.error("SocialAuthSuccessPage@verifyRefreshToken", error);
          setLoading(false);
          setIsPersist(false);
          setSessionState({ error: REFRESH_TOKEN_ERROR });
        }
      };
      // Call the verifyRefreshToken function
      if (!sessionState?.accessToken && isPersisted) {
        void verifyRefreshToken();
      }
    }

    // Update the effectRan flag
    return () => {
      effectRan.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: SessionContextValue = React.useMemo(() => {
    if (loading) {
      return {
        data: null,
        status: "loading",
        update(_data: Session | null) {
          return null;
        },
      };
    }

    if (sessionState) {
      return {
        data: sessionState,
        status: "authenticated",
        update(data: Partial<Session> | null) {
          if (data) {
            setSessionState({ ...sessionState, ...data });
          }
          return data;
        },
      };
    }

    return {
      data: null,
      status: "unauthenticated",
      update(data: Partial<Session> | null) {
        if (data) {
          setSessionState({ ...(sessionState || {}), ...data });
        }
        return data;
      },
    };
  }, [sessionState, loading]);

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession(): SessionContextValue {
  if (!SessionContext) {
    throw new Error("React Context is unavailable in Server Components");
  }

  // @ts-expect-error Satisfy TS if branch on line below
  const value: SessionContextValue = useContextSelector(
    SessionContext,
    (state) => state,
  );
  if (!value && process.env.NODE_ENV !== "production") {
    throw new Error(
      "[auth]: `useSession` must be wrapped in a <SessionProvider />",
    );
  }

  // const { onUnauthenticated } = options ?? {};

  // const requiredAndNotLoading = value.status === "unauthenticated";

  // React.useEffect(() => {
  //   if (requiredAndNotLoading) {
  //     const url = `${ROUTES.account.login}?${new URLSearchParams({
  //       callbackUrl: window.location.href,
  //     })}`;
  //     if (onUnauthenticated) onUnauthenticated();
  //     else window.location.href = url;
  //   }
  // }, [requiredAndNotLoading, onUnauthenticated]);

  // if (requiredAndNotLoading) {
  //   return {
  //     data: value.data,
  //     update: value.update,
  //     status: value.status,
  //   };
  // }

  return value;
}
