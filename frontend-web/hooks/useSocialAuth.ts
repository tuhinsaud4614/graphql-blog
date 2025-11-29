import * as React from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useLocalStorage } from "usehooks-ts";

import { useSession } from "@/components/providers/SessionProvider";
import { getSession } from "@/lib/actions";
import { KEYS, REFRESH_TOKEN_ERROR, ROUTES } from "@/lib/constants";
import { isDev } from "@/lib/isType";
import { getAuthUser } from "@/lib/utils";

/**
 * Custom hook to handle social authentication success.
 * It uses the `useSearchParams`, `useNavigate`, `useLocalStorage`, and `useLazyRefreshTokenQuery`
 * to handle the
 * verification of the refresh token and the navigation to the appropriate page.
 *
 * @returns {{isSuccess: boolean, isError: boolean}} An object with the `isSuccess` and `isError`
 * properties indicating the status of the authentication process.
 */
export function useSocialAuthSuccess() {
  // Flag to track if the effect has ran
  const effectRan = React.useRef<boolean>(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  // Get the search params from the URL
  const searchParams = useSearchParams();

  const { update } = useSession();

  // Get the navigation function
  const { replace } = useRouter();

  // Get the persist flag from the local storage and set it to false
  const [, setPersist] = useLocalStorage(
    KEYS.LOCAL_STORAGE_KEYS.persist,
    false,
  );

  // Get the redirect URL from the search params or set it to the dashboard route
  const redirectUrl = searchParams?.get("redirectUrl") || ROUTES.landing;

  // Effect to verify the refresh token and navigate to the appropriate page
  React.useEffect(() => {
    if (effectRan.current || isDev()) {
      const verifyRefreshToken = async () => {
        try {
          setIsLoading(true);
          setHasError(false);
          const session = await getSession();
          setIsLoading(false);
          const user = getAuthUser(session?.accessToken);
          if (user && session?.accessToken) {
            setPersist(true);
            update?.({
              accessToken: session.accessToken,
              user,
              expires: new Date(user.exp * 1000).toISOString(),
            });

            // Navigate to the redirect URL
            replace(redirectUrl);
          } else {
            setHasError(true);
            setPersist(false);
            update?.({ error: REFRESH_TOKEN_ERROR });
          }
        } catch (error) {
          // Log the error if it's in dev mode
          isDev() &&
            console.error("SocialAuthSuccessPage@verifyRefreshToken", error);
          setHasError(true);
          setIsLoading(false);
          setPersist(false);
          update({ error: REFRESH_TOKEN_ERROR });
        }
      };
      // Call the verifyRefreshToken function
      void verifyRefreshToken();
    }

    // Update the effectRan flag
    return () => {
      effectRan.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effect to navigate to the login page if there is an error
  // React.useEffect(() => {
  //   if (hasError) {
  //     const timeoutId = setTimeout(() => {
  //       // Navigate to the login page after 2 seconds
  //       replace(ROUTES.account.login);
  //     }, 2000);
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [hasError, replace]);

  // Return the status of the authentication process
  return { loading: isLoading, isError: hasError } as const;
}

/**
 * This hook is used to handle the failure of social authentication.
 * It checks the search params for a "redirectUrl" parameter and navigates
 * to that URL after a timeout of 2 seconds. If no redirectUrl is provided,
 * it navigates to the login route.
 *
 * @returns {void}
 */
export function useSocialAuthFailure() {
  // Get the search params from the URL
  const searchParams = useSearchParams();

  // Get the navigation function
  const { replace } = useRouter();

  // Get the redirect URL from the search params or set it to the login route
  const redirectUrl = searchParams?.get("redirectUrl") || ROUTES.account.login;

  // Effect to navigate to the redirect URL after a timeout of 2 seconds
  React.useEffect(() => {
    /**
     * Navigate to the redirect URL after a timeout of 2 seconds.
     * @returns {void}
     */
    const timeoutId = setTimeout(() => {
      replace(redirectUrl);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [replace, redirectUrl]);
}
