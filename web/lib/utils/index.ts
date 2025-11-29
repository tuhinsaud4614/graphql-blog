import clsx, { type ClassValue } from "clsx";
import { jwtDecode } from "jwt-decode";
import { twMerge } from "tailwind-merge";
import { isAuthUser } from "./isType";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * The function `getAuthUser` decodes a JWT token and returns the decoded user information if it is
 * valid, otherwise it returns null.
 * @param {string} [token] - The `token` parameter is a string that represents a JSON Web Token (JWT).
 * It is used for authentication and contains information about the user.
 * @returns The function `getAuthUser` returns the decoded token if it exists and is a valid user,
 * otherwise it returns `null`.
 */
export const getAuthUser = (token?: string | null) => {
    if (!token) {
        return null;
    }

    const decoded = jwtDecode<any>(token);
    if (!isAuthUser(decoded)) {
        return null;
    }

    return decoded;
};