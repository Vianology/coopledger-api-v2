import type { Request, Response } from "express";
import * as TxService from "../services/tx.service";

export async function deposit(req: Request, res: Response) {
  try {
    const { amount, ipfsCid, cooperativeId } = req.body;
    if (!amount || !cooperativeId) return res.status(400).json({ message: "Missing amount or cooperativeId" });
    const transaction = await TxService.initiateDeposit(req.session.user.id, amount, ipfsCid || null, cooperativeId);
    return res.status(202).json({ message: "Cotisation enregistrée", transactionId: transaction.id });
  } catch (error) { return res.status(500).json({ message: "Erreur lors du dépôt" }); }
}
