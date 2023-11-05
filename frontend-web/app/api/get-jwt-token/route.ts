import { NextRequest } from "next/server";

import { getToken } from "next-auth/jwt";

import { REFRESH_TOKEN_ERROR } from "@/lib/constants";

/**
 * The above function is an asynchronous function that handles a GET request and returns an access
 * token if it exists, otherwise it returns null.
 * @param {NextRequest} req - The `req` parameter is the request object that contains information about
 * the incoming HTTP request. It includes details such as the request method, headers, and query
 * parameters.
 * @returns The code is returning a JSON response. If a token is obtained successfully, it will return
 * an object with the access token. If a token is not obtained, it will return an object with a null
 * value for the access token.
 */
export async function GET(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (token) {
    if (token.error === REFRESH_TOKEN_ERROR) {
      return Response.json({ refreshToken: null });
    }
    return Response.json({ refreshToken: token.refreshToken });
  } else {
    return Response.json({ refreshToken: null });
  }
}
