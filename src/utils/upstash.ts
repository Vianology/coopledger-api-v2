import { Redis } from "@upstash/redis";
import { env } from "../config/env";

export const upstash = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

