import { createPubSub } from "@graphql-yoga/node";
import { PrismaClient } from "@prisma/client";
import { YogaContextType } from "./types";

const pubSub = createPubSub();
const prisma = new PrismaClient();

export default function createContext(props: YogaContextType) {
  return { ...props, pubSub, prisma } as const;
}
