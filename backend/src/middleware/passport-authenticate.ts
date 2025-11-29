import type { Request as ExpressRouter, NextFunction, Response } from "express";
import passport from "passport";

import config from "@/utils/config";

import logger from "@/logger";
import { HttpError } from "@/model";
import {
  generateAuthRedirectUrl,
  generateOauth2State,
  generateToken,
} from "@/utils";
import {
  clearOAuth2state,
  setOAuth2stateCookie,
  setRefreshTokeCookie,
} from "@/utils/cookies";
import { UserWithAvatar } from "@/utils/types";

/**
 * Middleware function to handle JWT authentication.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @param next - The next middleware function.
 */
export function authenticatePassportJWT(
  req: ExpressRouter,
  res: Response,
  next: NextFunction,
) {
  // Authenticate the user with JWT
  passport.authenticate(
    "jwt",
    { session: false }, // disable session creation
    (err: unknown, user: UserWithAvatar | undefined, _info: unknown) => {
      // If there is an error, return a Forbidden error
      if (err) {
        logger.error("Error during authorization", {
          stack: (err as Error)?.stack,
        });
        return next(new HttpError("Unauthorized", 401));
      }

      // If user is not authenticated, return a Forbidden error
      if (!user) {
        logger.error("User not found during authorization.");
        return next(new HttpError("Unauthorized", 401));
      }

      // Attach user object to the request for further handling if needed
      req.user = user;

      // Call the next middleware function
      next();
    },
  )(req, res, next);
}

/**
 * Middleware function to handle Google OAuth2 authentication.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @param next - The next middleware function.
 */
export function authenticateGoogleOAuth2(
  req: ExpressRouter<unknown, unknown, unknown, { redirectUrl?: string }>,
  res: Response,
  next: NextFunction,
) {
  // Extract the redirect URL from the query parameters or use the default URL
  const redirectUrl = req.query.redirectUrl;

  // Generate state for OAuth2 authentication and split it into random state and redirect URL
  const state = redirectUrl ? generateOauth2State(redirectUrl) : undefined;
  if (state) {
    // Set a cookie with the random state for verification after the authentication process
    setOAuth2stateCookie(res, state.split(":")[0]);
  }
  // Authenticate the user with Google OAuth2
  passport.authenticate(
    "google",
    { scope: ["email", "profile"], state, session: false },
    (err: unknown, user: UserWithAvatar | undefined, _info: unknown) => {
      if (err) {
        logger.error("Error during authentication", {
          stack: (err as Error)?.stack,
        });

        // If there is an error, return an Unauthorized error
        return res.redirect(
          generateAuthRedirectUrl(
            config.GOOGLE_OAUTH2_AUTHORIZATION_FAILED_REDIRECT_URL,
            redirectUrl ? { redirectUrl: redirectUrl } : undefined,
          ),
        );
      }
      if (!user) {
        logger.error("User not found during authentication.");

        return res.redirect(
          generateAuthRedirectUrl(
            config.GOOGLE_OAUTH2_AUTHORIZATION_FAILED_REDIRECT_URL,
            redirectUrl ? { redirectUrl: redirectUrl } : undefined,
          ),
        );
      }
      req.user = user; // Attach user object to the request for further handling if needed
      next();
    },
  )(req, res, next);
}

/**
 * Handles the callback after the Google OAuth2 authentication process.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @param next - The next middleware function.
 */
export function authenticateGoogleOauth2Callback(
  req: ExpressRouter<unknown, unknown, unknown, { state?: string }>,
  res: Response,
  next: NextFunction,
) {
  let successRedirectURL: string | undefined;
  try {
    // Extract the state parameter from the request
    const state = req.query.state;

    if (state) {
      // Split the state parameter into random state and redirect URL
      const [randomState, redirectUrl] = state.split(":");

      // Get the stored state from the cookie
      const storedState = req.cookies.oauth2state;

      // Clear the state cookie after verification
      clearOAuth2state(res);

      // Check if the redirect URL and random state are valid
      if (!redirectUrl || randomState !== storedState) {
        return res.redirect(
          generateAuthRedirectUrl(
            config.GOOGLE_OAUTH2_AUTHORIZATION_FAILED_REDIRECT_URL,
          ),
        );
      }

      successRedirectURL = redirectUrl;
    }
    // Authenticate the user with Google OAuth2
    passport.authenticate(
      "google",
      {
        session: false,
        failureRedirect: config.GOOGLE_OAUTH2_AUTHORIZATION_FAILED_REDIRECT_URL,
      },
      async (
        err: unknown,
        user: UserWithAvatar | undefined,
        _info: unknown,
      ) => {
        if (err || !user) {
          logger.error("Authentication error", {
            message: err
              ? "Error during authentication"
              : "User not found during authentication.",
            stack: (err as Error)?.stack,
          });
          return res.redirect(
            generateAuthRedirectUrl(
              config.GOOGLE_OAUTH2_AUTHORIZATION_FAILED_REDIRECT_URL,
              successRedirectURL
                ? { redirectUrl: successRedirectURL }
                : undefined,
            ),
          );
        }

        // Attach user object to the request for further handling if needed
        req.user = user;

        // Generate the refresh token for the user
        const refreshToken = await generateToken(
          user,
          config.REFRESH_TOKEN_SECRET_KEY,
          config.REFRESH_TOKEN_EXPIRES,
          true,
        );

        // Set the refresh token in the cookie
        setRefreshTokeCookie(res, refreshToken);

        const url = new URL(
          config.GOOGLE_OAUTH2_AUTHORIZATION_SUCCESS_REDIRECT_URL,
        );
        if (successRedirectURL) {
          url.searchParams.append(
            "redirectUrl",
            decodeURIComponent(successRedirectURL),
          );
        }
        // Redirect the user to the redirect URL
        return res.redirect(
          generateAuthRedirectUrl(
            config.GOOGLE_OAUTH2_AUTHORIZATION_SUCCESS_REDIRECT_URL,
            successRedirectURL
              ? { redirectUrl: successRedirectURL }
              : undefined,
          ),
        );
      },
    )(req, res, next);
  } catch (error) {
    logger.error("Error google auth during authentication", {
      stack: (error as Error)?.stack,
    });
    return res.redirect(
      generateAuthRedirectUrl(
        config.GOOGLE_OAUTH2_AUTHORIZATION_FAILED_REDIRECT_URL,
        successRedirectURL ? { redirectUrl: successRedirectURL } : undefined,
      ),
    );
  }
}
