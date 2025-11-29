import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

// import { getSession } from "next-auth/react";
import _merge from "lodash-es/merge";
import stream, { Stream } from "stream";

import { LoginSuccessResponse } from "@/app/api/auth/login/route";

import { callApi, callPostApi } from "./api";

// Types for login response
export type LoginResponse =
  | {
    error?: string;
  }
  | LoginSuccessResponse;

// Types for login parameters
export type LoginParams = {
  email: string;
  password: string;
};

// Constants for error messages
const AUTH_ERRORS = {
  INVALID_CREDENTIALS: "Invalid email or password",
  NETWORK_ERROR: "Network error occurred. Please try again.",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
} as const;

export async function doCredentialLogin({
  email,
  password,
}: LoginParams): Promise<LoginResponse> {
  try {
    const response = await callPostApi<LoginSuccessResponse>(
      "/api/auth/login",
      { email, password },
      undefined,
    );

    if (!response) {
      return {
        error: AUTH_ERRORS.UNKNOWN_ERROR,
      };
    }

    return response.data as LoginSuccessResponse;
  } catch (error) {
    console.error("Failed to login. Error:", error);
    return {
      error: AUTH_ERRORS.UNKNOWN_ERROR,
    };
  }
}

export type SessionResponse = { accessToken: string } | null;

export async function getSession(
  req?: NextRequest,
): Promise<{ accessToken: string } | null> {
  try {
    const res = await callApi<SessionResponse>("/api/auth/refresh-token", req, {
      "Cache-Control": "no-cache, no-store",
      Pragma: "no-cache",
      Expires: "0",
    });

    if (res.status === 204) return null; // no session
    if (!res.ok || !res.data) {
      return null;
    }

    return res.data.accessToken ? { accessToken: res.data.accessToken } : null;
  } catch (error) {
    console.error("Failed to get session. Error:", error);
    return null;
  }
}

export type DestroySessionResponse = { success: string };

export async function destroySession() {
  try {
    const res = await callApi<DestroySessionResponse>(
      "/api/auth/destroy-session",
      undefined,
      {
        "Cache-Control": "no-cache, no-store",
        Pragma: "no-cache",
        Expires: "0",
      },
    );

    if (res.status === 204) return null; // no session
    if (res.status !== 200 || !res.data) {
      console.error("Failed to destroy session", res.status);
      return false;
    }

    const data = res.data;
    return data.success;
  } catch (error) {
    console.error("Failed to destroy session. Error: ", error);
    return false;
  }
}

export async function retryRefreshToken() {
  const newAccessToken = await getSession();
  if (!newAccessToken?.accessToken) {
    return null;
  }

  return newAccessToken.accessToken;
}

export type DeepPartial<T> = T extends (...args: any[]) => any
  ? T
  : T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

export interface Options {
  whitelistedPatterns: (string | RegExp)[];
  messages: {
    wrongFormat: string;
    notWhitelisted: string;
    imageFetchError: string;
  };
  fallbackUrl: string;
}

export function withImageProxy(passedOptions?: DeepPartial<Options>) {
  const defaultOptions: Options = {
    whitelistedPatterns: [],
    fallbackUrl: "",
    messages: {
      wrongFormat: "Image url not provided or has wrong format",
      notWhitelisted: "Provided image url is not whitelisted",
      imageFetchError: "Couldn't fetch the image",
    },
  };

  const options: Options = _merge(defaultOptions, passedOptions);

  return async function (req: NextRequest, res: NextApiResponse) {
    const imageUrl = req.nextUrl.searchParams.get("imageUrl");

    if (!imageUrl || (imageUrl && Array.isArray(imageUrl))) {
      res.status(400).send({ message: options.messages.wrongFormat });
      return;
    }

    const isAllowed = isUrlWhitelisted(imageUrl, options.whitelistedPatterns);

    if (!isAllowed) {
      res.status(422).send({ message: options.messages.notWhitelisted });
      return;
    }

    const imageBlob = await fetchImageBlob(imageUrl);

    if (!imageBlob) {
      handleFallback(res, options);
      return;
    }

    pipeImage(res, imageBlob, options);
  };
}

function pipeImage(
  res: NextApiResponse,
  imageBlob: ReadableStream<Uint8Array>,
  options: Options,
) {
  const passThrough = new Stream.PassThrough();

  stream.pipeline(
    imageBlob as unknown as NodeJS.ReadableStream,
    passThrough,
    (err) => {
      if (err) {
        console.log(err);
        handleFallback(res, options);
        return;
      }
    },
  );
  passThrough.pipe(res);
}

function handleFallback(res: NextApiResponse, options: Options) {
  if (options.fallbackUrl.trim()) {
    res.redirect(options.fallbackUrl);
  } else {
    res.status(422).send({ message: options.messages.imageFetchError });
  }
}

async function fetchImageBlob(url: string) {
  return await fetch(url, {
    headers: { "user-agent": "Mozilla/5.0" },
  }).then((data) => data.body);
}

function isUrlWhitelisted(
  url: string,
  whitelistedPatterns: Options["whitelistedPatterns"],
) {
  return whitelistedPatterns.some((singleHost) => {
    return url.match(singleHost);
  });
}
