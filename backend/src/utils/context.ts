import { PrismaClient } from "@prisma/client";
import { createPubSub } from "graphql-yoga";

import { verifyAccessTokenInContext } from ".";
import {
  EAuthorStatus,
  EFollowingMutationStatus,
  EReactionsMutationStatus,
} from "./enums";
import { IUserPayload } from "./interfaces";
import { YogaContextType } from "./types";

const pubSub = createPubSub<{
  following: [
    userId: string,
    payload: { followedBy: IUserPayload; mutation: EFollowingMutationStatus },
  ];
  verifyUser: [
    userId: string,
    payload: { userId: string; mutation: EAuthorStatus },
  ];
  reactions: [
    postId: string,
    payload: { reactBy: IUserPayload; mutation: EReactionsMutationStatus },
  ];
}>();
export type YogaPubSubType = typeof pubSub;

const prisma = new PrismaClient();

export default function createContext({ request, ...rest }: YogaContextType) {
  const user = verifyAccessTokenInContext(request);
  return { ...rest, request, pubSub, prisma, user } as const;
}
