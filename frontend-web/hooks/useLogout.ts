import { setAuthUser } from "@features";
import { deleteCookie } from "cookies-next";
import { useLogoutMutation } from "graphql/generated/schema";
import { useAppDispatch } from "store";

export default function useLogout() {
  const rdxDispatch = useAppDispatch();
  const [logout, { loading, error, reset }] = useLogoutMutation({
    errorPolicy: "all",
  });

  async function logoutHandler() {
    await logout();
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    rdxDispatch(setAuthUser(null));
  }

  return { logoutHandler, loading, error, reset };
}
