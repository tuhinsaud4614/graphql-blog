import { PassportStatic } from "passport";
import GoogleOAuth2Strategy from "passport-google-oauth2";
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptionsWithoutRequest,
} from "passport-jwt";

import { verifyCallback, verifyGoogleOAuth2Callback } from "@/services/user";

import config from "./config";

export function passportJWTConfig(passport: PassportStatic) {
  const opts: StrategyOptionsWithoutRequest = {
    secretOrKey: config.ACCESS_TOKEN_SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };
  passport.use(new JwtStrategy(opts, verifyCallback));
}

export function passportGoogleOAuth2Config(passport: PassportStatic) {
  const opts: GoogleOAuth2Strategy.StrategyOptions = {
    clientID: config.GOOGLE_OAUTH2_CLIENT_ID,
    clientSecret: config.GOOGLE_OAUTH2_CLIENT_SECRET,
    callbackURL: config.GOOGLE_OAUTH2_CALLBACK_URL,
  };
  passport.use(
    new GoogleOAuth2Strategy.Strategy(opts, verifyGoogleOAuth2Callback),
  );
}
