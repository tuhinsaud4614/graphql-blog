import { cache } from "react";

import {
  GetPostByIdDocument,
  type GetPostByIdQuery,
  type GetPostByIdQueryVariables,
} from "@/graphql/generated/schema";

import { gqlRSCQuery } from "./apolloClient";

export const getPostByIdQuery = cache(async (postId: string) => {
  const result = await gqlRSCQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(
    {
      query: GetPostByIdDocument,
      variables: { id: postId },
      errorPolicy: "all",
    },
  );

  return result;
});
