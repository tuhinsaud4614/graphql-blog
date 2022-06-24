import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URI || "redis://127.0.0.1:6379",
});

redisClient.on("connect", () => {
  console.info("Redis connected successfully.");
});

redisClient.on("ready", () => {
  console.info(`Redis is ready to use.`);
});

redisClient.on("error", (err) => {
  console.error(`Redis not connected. ${err.message}`);
});

redisClient.on("end", () => {
  console.warn(`Redis is disconnected.`);
});

export default redisClient;
