import { Router } from "express";
import { initiatePayment, paymentCallback } from "../controllers/payments.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();
router.post("/initiate", isAuthenticated, initiatePayment);
router.post("/callback", paymentCallback);

export { router as paymentsRoutes };