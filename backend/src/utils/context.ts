import { createPubSub } from "graphql-yoga";

import { PrismaClient } from "@prisma/client";

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

class DbClient {
  static #instance: PrismaClient;

  private constructor() {}

  public static get instance() {
    if (this.#instance) {
      return this.#instance;
    }
    this.#instance = new PrismaClient();
    return this.#instance;
  }
}

const prisma = DbClient.instance;

export type YogaPubSubType = typeof pubSub;
export default function createContext({ request, ...rest }: YogaContextType) {
  const user = verifyAccessTokenInContext(request);
  return { ...rest, request, pubSub, prisma, user } as const;
}
