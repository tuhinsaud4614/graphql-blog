import axios from "axios";
import _has from "lodash-es/has";

/**
 * The function fetchRefreshToken is an asynchronous function that sends a POST request to a GraphQL
 * endpoint to retrieve a token using a refresh token, and returns the token if it exists, otherwise it
 * returns null.
 * @returns The function `fetchRefreshToken` returns a `Promise` that resolves to a string, `null`, or
 * `undefined`.
 */
export async function fetchRefreshToken(
    refreshToken?: string,
): Promise<string | null | undefined> {
    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!}/graphql`,
        {
            query: `
      query Token($refreshToken: String) {
        token(refreshToken: $refreshToken)
      }
    `,
            variables: { refreshToken: refreshToken },
        },
        {
            withCredentials: true,
        },
    );
    if (data && _has(data, "data") && _has(data.data, "token")) {
        return data.data.token as string;
    }
    return null;
}