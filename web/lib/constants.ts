export const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;
export const BACKEND_GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
export const BASE_URL =
    process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;

export const KEYS = {
    LOCAL_STORAGE_KEYS: {
        persist: "PERSIST",
    },
    SESSION_KEYS: {
        accessToken: "auth.session-token",
        refreshToken: "jwt",
    },
} as const;