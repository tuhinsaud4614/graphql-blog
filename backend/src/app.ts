import { createSchema, createYoga } from "@graphql-yoga/node";

import { IdentifyFn, useRateLimiter } from "@envelop/rate-limiter";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { Server } from "http";
import path from "path";

import logger from "@/logger";
import { errorHandler } from "@/middleware";
import { HttpError, RateLimitError } from "@/model";
import resolvers from "@/resolvers";
import typeDefs from "@/typeDefs";
import { createContext } from "@/utils";
import config from "@/utils/config";
import { SIGNALS } from "@/utils/constants";
import redisClient from "@/utils/redis";

async function shutdown({
  signal,
  server,
}: {
  signal: (typeof SIGNALS)[number];
  server: Server;
}) {
  logger.info(`Got signal ${signal} Good bye.`);
  await redisClient.disconnect();
  server.close(() => {
    process.exit(0);
  });
}

async function startServer() {
  // @ts-ignore
  const identifyFn: IdentifyFn = async (context) => {
    // @ts-ignore
    return context.request.ip;
  };

  const server = createYoga({
    // cors: { origin: [config.CLIENT_ENDPOINT], credentials: true },
    schema: createSchema({
      typeDefs,
      resolvers,
    }),
    // renderGraphiQL,
    context: (props) => createContext(props),
    plugins: [
      useRateLimiter({
        identifyFn,
        onRateLimitError({ error }) {
          logger.error(error);
        },
        transformError(message) {
          return new RateLimitError(message);
        },
      }),
    ],
  });

  const app = express();

  // app.use(helmet());
  // app.use(compression());
  app.use(cors({ origin: config.CLIENT_ENDPOINT, credentials: true }));
  app.use(cookieParser());
  app.use(express.static(path.join(process.cwd(), "public")));
  app.use("/images", express.static(path.join(process.cwd(), "images")));
  app.use("/graphql", server);

  // No Route found
  app.use((_: Request, __: Response, next: NextFunction) => {
    const error = new HttpError("Could not found this route", 404);
    next(error);
  });
  app.use(errorHandler);

  const httpServer = app.listen(config.PORT, async () => {
    logger.info(
      `Running a GraphQL API server at ${config.HOST}:${config.PORT}/graphql`,
    );
  });

  try {
    await redisClient.connect();
  } catch (error) {
    process.exit(1);
  }

  SIGNALS.forEach((signal) => {
    process.on(signal, () => shutdown({ signal, server: httpServer }));
  });
}

startServer();
