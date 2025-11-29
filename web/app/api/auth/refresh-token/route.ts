import { NextRequest, NextResponse } from "next/server";

import { KEYS } from "@/lib/constants";
import { getAuthUser } from "@/lib/utils";
import { fetchRefreshToken } from "@/lib/api/auth.api";
import { isDev } from "@/lib/utils/isType";


export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(KEYS.SESSION_KEYS.accessToken)?.value;
  if (accessToken) {
    const user = getAuthUser(accessToken);

    if (user?.exp && user.exp * 1000 > Date.now()) {
      return NextResponse.json(
        {
          accessToken,
        },
        { headers: { "Cache-Control": "no-store" } },
      );
    }
  }

  const refreshToken = request.cookies.get(
    KEYS.SESSION_KEYS.refreshToken,
  )?.value;

  if (!refreshToken) {
    const response = NextResponse.json(null, {
      headers: { "Cache-Control": "no-store" },
    });
    response.cookies.delete(KEYS.SESSION_KEYS.accessToken);
    response.cookies.delete(KEYS.SESSION_KEYS.refreshToken);
  }

  const newAccessToken = await fetchRefreshToken(refreshToken);

  const user = getAuthUser(newAccessToken);

  if (user && newAccessToken) {
    const nextRes = NextResponse.json(
      { accessToken: newAccessToken },
      { headers: { "Cache-Control": "no-store" } },
    );
    const now = Math.floor(Date.now() / 1000);
    const exp = user.exp; // JWT exp in seconds
    const maxAge = Math.max(exp - now, 0);
    nextRes.cookies.set(KEYS.SESSION_KEYS.accessToken, newAccessToken, {
      httpOnly: true,
      secure: !isDev(),
      sameSite: "lax",
      maxAge,
    });
    return nextRes;
  }

  const response = NextResponse.json(null, {
    headers: { "Cache-Control": "no-store" },
  });
  response.cookies.delete(KEYS.SESSION_KEYS.accessToken);
  response.cookies.delete(KEYS.SESSION_KEYS.refreshToken);
  return response;
}
