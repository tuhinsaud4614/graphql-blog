import { useGraphQlJit } from "@envelop/graphql-jit";
import { useRateLimiter } from "@envelop/rate-limiter";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cookieParser from "cookie-parser";
import express, {
  NextFunction,
  Request,
  Response,
  static as expressStatic,
} from "express";
import { Server } from "http";
import morgan from "morgan";
import passport from "passport";
import path from "path";

import config from "@/utils/config";

import { createYoga } from "graphql-yoga";

import logger from "@/logger";
import { errorHandler } from "@/middleware";
import { HttpError, RateLimitError } from "@/model";
import resolvers from "@/resolvers";
import typeDefs from "@/typeDefs";
import { createContext } from "@/utils";
import { SIGNALS } from "@/utils/constants";
import redisClient from "@/utils/redis";
import { YogaContextType } from "@/utils/types";

import { initializeEventSystem, shutdownEventSystem } from "./events/core";
import routes from "./routes";
import {
  passportGoogleOAuth2Config,
  passportJWTConfig,
} from "./utils/passport.config";

async function shutdown({
  signal,
  server,
}: {
  signal: (typeof SIGNALS)[number];
  server: Server;
}) {
  // 1. Shutdown event system first (unsubscribe all handlers)
  await shutdownEventSystem();

  // 2. Disconnect Redis clients
  redisClient.generalClient.disconnect();

  // 3. Close HTTP server
  logger.info(`Got signal ${signal} Good bye.`);
  server.close(() => {
    process.exit(0);
  });
}

async function startServer() {
  // Initialize event system before anything else
  await initializeEventSystem();
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
      // useResponseCache({
      //   session: () => null,
      //   cache: createRedisCache({ redis: redisClient }),
      //   ttl: 1000 * 60,
      // }),
      useRateLimiter({
        identifyFn: (context) => (context as YogaContextType).req.ip ?? "",
        onRateLimitError({ error }) {
          logger.error(error);
          throw new RateLimitError(error);
        },
      }),
    ],
  });

  const app = express();

  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms"),
  );
  // app.use(
  //   cors({
  //     credentials: true,
  //     origin: getAllowedOriginsFromEnv(),
  //   }),
  // );
  app.use(cookieParser());
  app.use(expressStatic(path.join(process.cwd(), "public")));
  app.use(passport.initialize());
  passportGoogleOAuth2Config(passport);
  passportJWTConfig(passport);

  app.use("/images", expressStatic(path.join(process.cwd(), "images")));
  app.use("/api", routes);
  app.use("/graphql", server.requestListener);

  // No Route found
  app.use((_: Request, __: Response, next: NextFunction) => {
    const error = new HttpError("Could not found this route", 404);
    next(error);
  });
  app.use(errorHandler);

  try {
    await redisClient.generalClient.connect();
    const httpServer = app.listen(config.PORT, async () => {
      logger.info(
        `Running a GraphQL server at ${config.HOST}:${config.PORT}/graphql`,
      );
    });

    SIGNALS.forEach((signal) => {
      process.on(signal, () => shutdown({ signal, server: httpServer }));
    });
  } catch (err) {
    logger.error(`Encountered an error starting server: ${err}`);
    process.exit(1);
  }
}

startServer();
