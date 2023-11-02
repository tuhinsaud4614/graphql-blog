import axios from "axios";

/**
 * The function `getNextAuthJWTToken` is an asynchronous function that retrieves a JWT token from an
 * API endpoint and returns it, or returns null if there is an error.
 * This used for securely get `access token` from server side by client
 * @returns a JWT token as a string if it is successfully retrieved from the "/api/get-jwt-token"
 * endpoint. If the token is not found or there is an error, the function returns null.
 */
export async function getNextAuthJWTToken() {
  try {
    const { data } = await axios.get("/api/get-jwt-token");
    const _has = await import("lodash/has").then((mod) => mod.default);
    if (_has(data, "accessToken") && data.accessToken) {
      return data.accessToken as string;
    }

    return null;
  } catch (error) {
    return null;
  }
}
