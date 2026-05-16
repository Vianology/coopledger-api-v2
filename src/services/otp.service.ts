import { default as Redis } from "ioredis";
import { env } from "../config/env";

export const redis = new Redis(env.REDIS_URL, { maxRetriesPerRequest: null, enableReadyCheck: false });

export async function setOTP(phone: string, code: string) { await redis.set(`otp:${phone}`, code, "EX", 300); }
export async function getOTP(phone: string) { return await redis.get(`otp:${phone}`); }
export async function deleteOTP(phone: string) { await redis.del(`otp:${phone}`); }
