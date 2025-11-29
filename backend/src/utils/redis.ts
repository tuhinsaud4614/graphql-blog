import { Redis } from "ioredis";

import logger from "@/logger";

import config from "./config";

export class RedisClient {
  private _redisClient: Redis;
  private _publisherClient: Redis;
  private _subscriberClient: Redis;
  private static instance: RedisClient;

  private constructor() {
    this._redisClient = new Redis(
      `redis://${config.REDIS_HOST}:${config.REDIS_PORT}`,
      { lazyConnect: true },
    );
    this._publisherClient = new Redis(
      `redis://${config.REDIS_HOST}:${config.REDIS_PORT}`,
      {
        retryStrategy: (times) => Math.min(times * 50, 2000),
        lazyConnect: true,
      },
    );

    this._subscriberClient = new Redis(
      `redis://${config.REDIS_HOST}:${config.REDIS_PORT}`,
      {
        retryStrategy: (times) => Math.min(times * 50, 2000),
        lazyConnect: true,
      },
    );

    this.setupEventListeners();
  }

  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }

  public get generalClient(): Redis {
    return this._redisClient;
  }

  public get publisherClient(): Redis {
    return this._publisherClient;
  }

  public get subscriberClient(): Redis {
    return this._subscriberClient;
  }

  private setupEventListeners(): void {
    const setupClientListeners = (client: Redis, type: string) => {
      client.on("connect", () => logger.info(`Redis ${type} connected`));
      client.on("ready", () => logger.info(`Redis ${type} ready`));
      client.on("error", (err) => logger.error(`Redis ${type} error:`, err));
      client.on("end", () => logger.warn(`Redis ${type} disconnected`));
    };

    setupClientListeners(this._redisClient, "Client");
    setupClientListeners(this._publisherClient, "Publisher");
    setupClientListeners(this._subscriberClient, "Subscriber");
  }

  public async connect(): Promise<void> {
    await Promise.all([
      this._redisClient.connect(),
      this._publisherClient.connect(),
      this._subscriberClient.connect(),
    ]);
  }

  public async disconnect(): Promise<void> {
    await Promise.all([
      this._redisClient.disconnect(),
      this._publisherClient.disconnect(),
      this._subscriberClient.disconnect(),
    ]);
  }

  public async publish<T>(channel: string, message: T): Promise<boolean> {
    try {
      await this._publisherClient.publish(channel, JSON.stringify(message));
      return true;
    } catch (err) {
      logger.error("Publish error:", err);
      return false;
    }
  }

  public async subscribe<T>(
    channel: string,
    callback: (message: T) => void,
  ): Promise<void> {
    await this._subscriberClient.subscribe(channel);
    this._subscriberClient.on("message", (ch, message) => {
      if (ch === channel) {
        try {
          callback(JSON.parse(message));
        } catch (err) {
          logger.error("Message parsing error:", err);
        }
      }
    });
  }

  public async unsubscribe(channel: string): Promise<void> {
    await this._subscriberClient.unsubscribe(channel);
  }

  // Standard Redis client methods
  public async get(key: string): Promise<string | null> {
    return this._redisClient.get(key);
  }
}

const redisClient = RedisClient.getInstance();
export default redisClient;
