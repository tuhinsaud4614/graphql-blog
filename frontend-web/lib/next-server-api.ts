import axios from "axios";

import { fetchRefreshToken } from "./utils";

/**
 * The function `getRefreshTokenFromNextAuth` is an asynchronous function that retrieves a JWT token from an
 * API endpoint and returns it, or returns null if there is an error.
 * This used for securely get `access token` from server side by client
 * @returns a JWT token as a string if it is successfully retrieved from the "/api/get-jwt-token"
 * endpoint. If the token is not found or there is an error, the function returns null.
 */
export async function getAccessTokenAfterRotation() {
  try {
    const { data } = await axios.get("/api/get-jwt-token");
    const _has = await import("lodash/has").then((mod) => mod.default);
    if (_has(data, "refreshToken") && data.refreshToken) {
      const newAccessToken = await fetchRefreshToken(data.refreshToken);

      if (!newAccessToken) {
        return null;
      }
      return newAccessToken;
    }

    return null;
  } catch (error) {
    return null;
  }
}
