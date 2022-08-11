// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  accessToken: string;
  refreshToken: string;
};

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' })
// }

import axios from "axios";
import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

export default async function refreshToken(
  req: NextApiRequest,
  res: NextApiResponse<Data | any>
) {
  try {
    const token = getCookie("refreshToken", { req }) as string;
    const { data, headers: returnedHeaders } = await axios.post(
      process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "",
      {
        query: `
      mutation Token($refreshToken: String!) {
        token(refreshToken: $refreshToken) {
          accessToken
          refreshToken
        }
      }
    `,
        variables: { refreshToken: token },
        headers: {
          "content-type": "application/json",
        },
      }
    );
    Object.keys(returnedHeaders).forEach((key) =>
      res.setHeader(key, returnedHeaders[key])
    );

    const accessToken = data.data.token.accessToken;
    const refreshToken = data.data.token.refreshToken;
    if (accessToken && refreshToken) {
      res.status(200).json({ accessToken, refreshToken });
    }
  } catch (error) {
    // we don't want to send status 401 here.
    res.send(error);
  }
}
