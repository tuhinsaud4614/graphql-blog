import { createYoga } from "graphql-yoga";

import { useGraphQlJit } from "@envelop/graphql-jit";
import { useRateLimiter } from "@envelop/rate-limiter";
import { useResponseCache } from "@envelop/response-cache";
import { createRedisCache } from "@envelop/response-cache-redis";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { Server } from "http";
import path from "path";

import logger from "@/logger";
import { errorHandler } from "@/middleware";
import { HttpError, RateLimitError } from "@/model";
import typeDefs from "@/typeDefs";
import { createContext } from "@/utils";
import config from "@/utils/config";
import { SIGNALS } from "@/utils/constants";
import redisClient from "@/utils/redis";

import resolvers from "./resolvers";
import { YogaContextType } from "./utils/types";

async function shutdown({
  signal,
  server,
}: {
  signal: (typeof SIGNALS)[number];
  server: Server;
}) {
  redisClient.disconnect();
  logger.info(`Got signal ${signal} Good bye.`);
  server.close(() => {
    process.exit(0);
  });
}

async function startServer() {
  const server = createYoga({
    // cors: { origin: [config.CLIENT_ENDPOINT], credentials: true },
    schema: makeExecutableSchema({
      resolvers,
      typeDefs,
    }),
    context: (props: YogaContextType) => {
      return createContext(props);
    },
    plugins: [
      useGraphQlJit(),
      useResponseCache({
        session: () => null,
        cache: createRedisCache({ redis: redisClient }),
        ttl: 1000 * 60,
      }),
      useRateLimiter({
        identifyFn: (context: any) => context.request.ip,
        onRateLimitError({ error }) {
          logger.error(error);
          throw new RateLimitError(error);
        },
      }),
    ],
  });

  const app = express();

  app.use(cors({ origin: config.CLIENT_ENDPOINT, credentials: true }));
  app.use(cookieParser());
  app.use(express.static(path.join(process.cwd(), "public")));
  app.use("/images", express.static(path.join(process.cwd(), "images")));
  app.use("/graphql", server.requestListener);

  // No Route found
  app.use((_: Request, __: Response, next: NextFunction) => {
    const error = new HttpError("Could not found this route", 404);
    next(error);
  });
  app.use(errorHandler);

  try {
    await redisClient.connect();

    const httpServer = app.listen(config.PORT, async () => {
      logger.info(
        `Running a GraphQL API server at ${config.HOST}:${config.PORT}/graphql`,
      );
    });

    SIGNALS.forEach((signal) => {
      process.on(signal, () => shutdown({ signal, server: httpServer }));
    });
  } catch (error) {
    process.exit(1);
  }
}

startServer();
