import { Redis } from "ioredis";

import logger from "@/logger";

import config from "./config";

const redisClient = new Redis(
  `redis://${config.REDIS_HOST}:${config.REDIS_PORT}`,
  { lazyConnect: true },
);

redisClient.on("connect", () => {
  logger.info("Redis connected successfully.");
});

redisClient.on("ready", () => {
  logger.info("Redis is ready to use.");
});

redisClient.on("error", (err) => {
  logger.error(`Redis not connected. ${err.message}`);
});

redisClient.on("end", () => {
  logger.warn("Redis is disconnected.");
});

export default redisClient;
