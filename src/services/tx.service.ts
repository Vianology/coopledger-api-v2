import { prisma } from "../utils/prisma";
import { blockchainQueue } from "../utils/queue";
import { TransactionType, TransactionStatus } from "@prisma/client";

export async function initiateDeposit(userId: string, amount: number, ipfsCid: string | null, cooperativeId: string) {
  const transaction = await prisma.transaction.create({
    data: { userId, amount, type: TransactionType.COTISATION, status: TransactionStatus.PENDING, ipfsCid, cooperativeId },
  });
  await blockchainQueue.add("process-deposit", { txId: transaction.id });
  return transaction;
}
