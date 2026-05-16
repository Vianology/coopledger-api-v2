import Redis from "ioredis";
import { env } from "../config/env";

export const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  tls: {}, // Force TLS (indispensable pour rediss://)
  retryStrategy(times) {
    const delay = Math.min(times * 100, 3000);
    return delay;
  }
});

redis.on("error", (err) => console.error("Redis (ioredis) error:", err.message));