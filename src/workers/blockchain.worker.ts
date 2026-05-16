import { Worker } from "bullmq";
import { prisma } from "../utils/prisma";
import { blockchainQueue } from "../utils/queue";
import { ProofType, recordProofOnChain } from "../services/blockchain.service";
import { encryptWithKey } from "../services/crypto.service";
import { pinata } from "../utils/storage";
import { createHash } from "crypto";
import { decrypt } from "../services/crypto.service";

const worker = new Worker("blockchain-transactions", async (job) => {
  const { txId } = job.data;
  const tx = await prisma.transaction.findUnique({ where: { id: txId }, include: { cooperative: true, user: true } });
  if (!tx || tx.status !== "PENDING") return;
  const coop = tx.cooperative;
  if (!coop?.encryptionKey) throw new Error("Missing encryption key");
  const coopKey = decrypt(coop.encryptionKey);
  const receipt = { transactionId: tx.id, externalId: tx.externalId, type: tx.type, amount: tx.amount, userId: tx.userId, cooperativeId: tx.cooperativeId, voteId: tx.voteId, timestamp: new Date().toISOString() };
  const receiptBuffer = Buffer.from(JSON.stringify(receipt), "utf-8");
  const encryptedReceipt = encryptWithKey(receiptBuffer, coopKey);
  const blob = new Blob([encryptedReceipt.encryptedData], { type: "application/octet-stream" });
  const file = new File([blob], `receipt-${tx.id}.json`, { type: "application/octet-stream" });
  const upload = await pinata.upload.public.file(file);
  const cid = upload.cid;
  const hash = createHash("sha256").update(encryptedReceipt.encryptedData).digest("hex");
  const proofType = tx.type === "COTISATION" ? ProofType.COTISATION : ProofType.RETRAIT;
  const blockchainTxHash = await recordProofOnChain(tx.cooperativeId, hash, cid, tx.amount, proofType);
  await prisma.transaction.update({ where: { id: tx.id }, data: { status: "CONFIRMED", ipfsCid: cid, blockchainHash: blockchainTxHash, receiptHash: hash } });
}, { connection: blockchainQueue.opts.connection, concurrency: 5 });

worker.on("failed", (job, err) => console.error(`Job ${job?.id} failed: ${err.message}`));
export { worker };
