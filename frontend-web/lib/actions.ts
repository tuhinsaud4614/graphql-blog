"use server";

import { signIn, signOut } from "./auth";
import { ROUTES } from "./constants";

// Types for login response
export type LoginResponse = {
  error?: string;
  status: number;
  ok: boolean;
  url?: string;
};

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

export async function doLogout() {
  try {
    await signOut({ redirectTo: ROUTES.landing });
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("Failed to logout. Please try again.");
  }
}

export async function doCredentialLogin({
  email,
  password,
}: LoginParams): Promise<LoginResponse> {
  try {
    const response = await signIn("credentials", {
      emailOrMobile: email,
      password,
      redirect: false,
    });

    if (!response) {
      return {
        error: AUTH_ERRORS.UNKNOWN_ERROR,
        status: 500,
        ok: false,
      };
    }

    return response as LoginResponse;
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : AUTH_ERRORS.UNKNOWN_ERROR,
      status: 500,
      ok: false,
    };
  }
}
