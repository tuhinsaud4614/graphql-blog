import { setAuthUser } from "@features";
import { deleteCookie } from "cookies-next";
import { useLogoutMutation } from "graphql/generated/schema";
import { useAppDispatch } from "store";
import { isDev } from "utils";

export default function useLogout() {
  const rdxDispatch = useAppDispatch();
  const [logout, { loading, error, reset, client }] = useLogoutMutation({
    errorPolicy: "all",
  });

  async function logoutHandler() {
    try {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      rdxDispatch(setAuthUser(null));
      await logout();
    } catch (error) {
      isDev() && console.log("Logout error", error);
    }
  }

  return { logoutHandler, loading, error, reset };
}
