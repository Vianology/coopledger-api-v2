import { upstash } from "../utils/upstash.js";

export async function setOTP(phone: string, code: string): Promise<void> {
  await upstash.set(`otp:${phone}`, code, { ex: 300 });
}

export async function getOTP(phone: string): Promise<string | null> {
  return await upstash.get(`otp:${phone}`);
}

export async function deleteOTP(phone: string): Promise<void> {
  await upstash.del(`otp:${phone}`);
}