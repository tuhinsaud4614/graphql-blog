import { cookies } from "next/headers";
import { NextRequest } from "next/server";

import { getToken } from "next-auth/jwt";

import { REFRESH_TOKEN_ERROR } from "@/lib/constants";

/**
 * The above function is an HTTP GET endpoint that checks if a token exists and returns the refresh
 * token if it does, otherwise it returns null.
 * @param {NextRequest} req - The `req` parameter is the request object that contains information about
 * the incoming HTTP request. It includes details such as the request method, headers, and query
 * parameters. In this code snippet, it is used to pass the request object to the `getToken` function.
 * @returns a JSON response. If a token is present, it returns an object with the property
 * "refreshToken" set to the value of the token's refresh token. If no token is present, it returns an
 * object with "refreshToken" set to null.
 */
export async function GET(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (token) {
    if (token.error === REFRESH_TOKEN_ERROR) {
      // If REFRESH_TOKEN_ERROR thrawed, but the 'next-auth.session-token' still exists in the cookies, remove it.
      const JWT_TOKEN_KEY = "next-auth.session-token";
      cookies().has(JWT_TOKEN_KEY) && cookies().delete(JWT_TOKEN_KEY);
      return Response.json(null);
    }
    return Response.json({
      refreshToken: token.refreshToken,
      accessToken: token.accessToken,
    });
  } else {
    return Response.json(null);
  }
}
