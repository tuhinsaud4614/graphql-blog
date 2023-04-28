import { createPubSub } from "graphql-yoga";

import { AuthorStatus } from "@prisma/client";

import { verifyAccessTokenInContext } from ".";
import prisma from "./db-client";
import { EFollowingMutationStatus, EReactionsMutationStatus } from "./enums";
import { UserWithAvatar, YogaContextType } from "./types";

const pubSub = createPubSub<{
  following: [
    userId: string,
    payload: { followedBy: UserWithAvatar; mutation: EFollowingMutationStatus },
  ];
  verifyUser: [
    userId: string,
    payload: { userId: string; mutation: AuthorStatus },
  ];
  reactions: [
    postId: string,
    payload: { reactBy: UserWithAvatar; mutation: EReactionsMutationStatus },
  ];
}>();

export type YogaPubSubType = typeof pubSub;

export default function createContext({ request, ...rest }: YogaContextType) {
  const user = verifyAccessTokenInContext(request);
  return { ...rest, request, pubSub, prisma, user } as const;
}
