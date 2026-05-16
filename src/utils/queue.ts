import { Queue } from "bullmq";
import { redis } from "./redis";

export const blockchainQueue = new Queue("blockchain-transactions", {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
    removeOnComplete: 100,
    removeOnFail: 500,
  },
});