import { deleteCookie } from "cookies-next";
import { useLogoutMutation } from "graphql/generated/schema";
import { useAuthStateChange } from "store";

export default function useLogout() {
  const setUser = useAuthStateChange();
  const [logout, { loading, error, reset }] = useLogoutMutation({
    errorPolicy: "all",
  });

  async function logoutHandler() {
    await logout();
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    setUser(null);
  }

  return { logoutHandler, loading, error, reset };
}
