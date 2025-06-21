import { GetPostByIdDocument, type GetPostByIdQuery, type GetPostByIdQueryVariables } from "@/graphql/generated/schema";
import { cache } from "react";
import { getClient } from "./apolloClient";

export const getPostByIdQuery = cache(async (postId: string) => {
  const result = await getClient().query<
    GetPostByIdQuery,
    GetPostByIdQueryVariables
  >({
    query: GetPostByIdDocument,
    variables: { id: postId },
    errorPolicy: "all",
  });

  return result;
});
