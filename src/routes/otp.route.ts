import { Router } from "express";
import { sendOTP, verifyOTP } from "../controllers/otp.controller";

const router = Router();
router.post("/send-code", sendOTP);
router.post("/verify", verifyOTP);

export { router as otpRoutes };