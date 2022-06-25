import { createPubSub } from "@graphql-yoga/node";
import { PrismaClient } from "@prisma/client";
import { verifyAccessTokenInContext } from ".";
import { YogaContextType } from "./types";

const pubSub = createPubSub();
const prisma = new PrismaClient();

export default function createContext({ request, ...rest }: YogaContextType) {
  const user = verifyAccessTokenInContext(request);
  return { ...rest, request, pubSub, prisma, user } as const;
}
