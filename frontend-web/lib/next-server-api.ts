import axios from "axios";

import { fetchRefreshToken, getAuthUser } from "./utils";

/**
 * The function `getAccessTokenFromNextAuth` retrieves an access token from an API endpoint and checks
 * if it is valid, refreshing it if necessary.
 * This used for securely get `access token` from server side by client
 * @returns The function `getAccessTokenFromNextAuth` returns a Promise that resolves to either an
 * access token (string) or `null`.
 */
export async function getAccessTokenFromNextAuth() {
  try {
    const { data } = await axios.get("/api/get-jwt-token");
    if (!data) {
      return null;
    }
    const _has = await import("lodash/has").then((mod) => mod.default);
    if (
      _has(data, "refreshToken") &&
      _has(data, "accessToken") &&
      data.refreshToken &&
      data.accessToken
    ) {
      const accessToken = data.accessToken as string;
      const user = getAuthUser(accessToken);
      if (user && user.exp * 1000 > Date.now()) {
        return accessToken;
      }

      const newAccessToken = await fetchRefreshToken(data.refreshToken);

      if (!newAccessToken) {
        return null;
      }
      return newAccessToken;
    }

    return null;
  } catch (_) {
    return null;
  }
}
