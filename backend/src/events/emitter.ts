import logger from "@/logger";
import { PUBSUB_EVENTS } from "@/utils/constants";
import redisClient, { RedisClient } from "@/utils/redis";

type EventMap = {
  [PUBSUB_EVENTS.POST_PUBLISH]: { postID: string };
};

type EventName = keyof EventMap;
type EventPayload<K extends EventName> = EventMap[K];
type EventHandler<T> = (data: T) => Promise<void> | void;

export class EventEmitter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private channels: Map<string, Set<(data: any) => void | Promise<void>>> =
    new Map();
  private redisClient: RedisClient;

  constructor(redisClient: RedisClient) {
    this.redisClient = redisClient;
  }

  public async emit<K extends EventName>(
    event: K,
    data: EventPayload<K>,
  ): Promise<boolean> {
    const channel = `event:${event}`;
    const message = {
      event,
      data,
      timestamp: Date.now(),
    };

    logger.debug(`Emitting event ${event}`, { data });
    return this.redisClient.publish(channel, message);
  }

  public async on<K extends EventName>(
    event: K,
    handler: EventHandler<EventPayload<K>>,
  ): Promise<() => Promise<void>> {
    const channel = `event:${event}`;

    if (!this.channels.has(channel)) {
      this.channels.set(channel, new Set());
      await this.redisClient.subscribe<{ data: EventPayload<K> }>(
        channel,
        async (message) => {
          if (this.channels.has(channel)) {
            const handlers = this.channels.get(channel);
            if (handlers) {
              for (const h of handlers) {
                try {
                  await h(message.data);
                } catch (err) {
                  logger.error(`Error in event handler for ${event}:`, err);
                }
              }
            }
          }
        },
      );
    }

    this.channels.get(channel)?.add(handler);
    return () => this.off(event, handler);
  }

  public async off<K extends EventName>(
    event: K,
    handler: EventHandler<EventPayload<K>>,
  ): Promise<void> {
    const channel = `event:${event}`;
    if (this.channels.has(channel)) {
      const handlers = this.channels.get(channel);
      if (handlers) {
        handlers.delete(handler);

        if (handlers.size === 0) {
          this.channels.delete(channel);
          await this.redisClient.unsubscribe(channel);
        }
      }
    }
  }

  public async once<K extends EventName>(
    event: K,
    handler: EventHandler<EventPayload<K>>,
  ): Promise<void> {
    const unsubscribe = await this.on(event, async (data) => {
      await unsubscribe();
      await handler(data);
    });
  }
}
const eventEmitter = new EventEmitter(redisClient);
export default eventEmitter;
