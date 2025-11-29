import redisClient from "@/utils/redis";

import logger from "../logger";
import eventEmitter from "./emitter";

// Initialize all event handlers
const registeredHandlers = new Map<string, () => Promise<void>>();

export async function initializeEventSystem() {
  // Setup all event handlers
  const { setupPostHandlers } = await import("./handlers/post.handlers");
  registeredHandlers.set("posts", await setupPostHandlers(eventEmitter));

  logger.info("Event system initialized");
}

export async function shutdownEventSystem() {
  // Unsubscribe all handlers
  for (const [name, unsubscribe] of registeredHandlers) {
    try {
      await unsubscribe();
      logger.info(`Unsubscribed ${name} event handlers`);
    } catch (err) {
      logger.error(`Failed to unsubscribe ${name} handlers:`, err);
    }
  }

  await redisClient.disconnect();
  logger.info("Event system shutdown complete");
}

export { eventEmitter };
