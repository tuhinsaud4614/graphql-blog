import { Response } from "express";
import ms from "ms";

import config from "./config";
import KeyGenerate from "./key-generate";

export function setRefreshTokeCookie(res: Response, refreshToken: string) {
  console.log(
    isNaN(+config.REFRESH_TOKEN_EXPIRES)
      ? ms(config.REFRESH_TOKEN_EXPIRES)
      : +config.REFRESH_TOKEN_EXPIRES,
  );
  res.cookie(KeyGenerate.JWT_COOKIE_KEY, refreshToken, {
    httpOnly: true, // accessible only by web server
    secure: true, // https
    sameSite: "none", // cross-site cookie
    maxAge: ms(config.REFRESH_TOKEN_EXPIRES), // cookie expiry
  });
}
export function clearRefreshTokeCookie(res: Response) {
  res.clearCookie(KeyGenerate.JWT_COOKIE_KEY, {
    httpOnly: true, // accessible only by web server
    secure: true, // https
    sameSite: "none", // cross-site cookie
  });
}

export function setOAuth2stateCookie(res: Response, value: string) {
  res.cookie("oauth2state", value, {
    httpOnly: true, // accessible only by web server
    secure: true, // https
    sameSite: "none", // cross-site cookie
    maxAge: ms(config.REFRESH_TOKEN_EXPIRES), // cookie expiry
  });
}

export function clearOAuth2state(res: Response) {
  res.clearCookie("oauth2state");
}
