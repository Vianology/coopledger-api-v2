import type { Request, Response } from "express";
import * as OTPService from "../services/otp.service";
import * as WhatsAppService from "../services/whatsapp.service";

export async function sendOTP(req: Request, res: Response) {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: "Numéro requis" });
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  try {
    await OTPService.setOTP(phone, code);
    await WhatsAppService.sendWhatsAppOTP(phone, code);
    return res.status(200).json({ message: "Code OTP envoyé" });
  } catch (error) { return res.status(500).json({ message: "Erreur envoi OTP" }); }
}

export async function verifyOTP(req: Request, res: Response) {
  const { phone, code } = req.body;
  if (!phone || !code) return res.status(400).json({ message: "Téléphone et code requis" });
  try {
    const saved = await OTPService.getOTP(phone);
    if (saved === code) {
      await OTPService.deleteOTP(phone);
      return res.status(200).json({ message: "Code valide", success: true });
    } else return res.status(400).json({ message: "Code invalide", success: false });
  } catch (error) { return res.status(500).json({ message: "Erreur vérification" }); }
}
