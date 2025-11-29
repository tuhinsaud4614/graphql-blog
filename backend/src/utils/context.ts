import eventEmitter from "@/events/emitter";

import { verifyAccessTokenInContext } from ".";
import prisma from "./db-client";
import yogaPubSub from "./pub-sub";
import { YogaContextType } from "./types";

export type YogaPubSubType = typeof yogaPubSub;

export default function createContext({
  request,
  res,
  ...rest
}: YogaContextType) {
  const user = verifyAccessTokenInContext(request);
  return {
    ...rest,
    res,
    request,
    pubSub: yogaPubSub,
    prisma,
    user,
    // esClient: esClient.client,
    eventEmitter,
  } as const;
}
