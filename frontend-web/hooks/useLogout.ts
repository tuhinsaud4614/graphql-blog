import { setAuthUser } from "@features";
import { useLogoutMutation } from "graphql/generated/schema";
import { useAppDispatch } from "store";
import { isDev, setAccessToken } from "utils";

export default function useLogout() {
  const rdxDispatch = useAppDispatch();
  const [logout, { loading, error, reset }] = useLogoutMutation({
    errorPolicy: "all",
  });

  async function logoutHandler() {
    try {
      await logout();
      setAccessToken(null);
      rdxDispatch(setAuthUser({ user: null, token: null }));
    } catch (error) {
      isDev() && console.log("Logout error", error);
    }
  }

  return { logoutHandler, loading, error, reset };
}
