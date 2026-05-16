import { Router } from "express";
import { approveCooperativeJoin, createCooperative, getCooperatives, joinCooperative } from "../controllers/cooperatives.controller";
import { isAuthenticated, isPlatformAdmin } from "../middlewares/auth.middleware";
import { upload } from "../utils/upload";

const router = Router();
router.post("/create", upload.fields([{ name: "status_document", maxCount: 1 }, { name: "proof_document", maxCount: 1 }, { name: "identity_document", maxCount: 1 }, { name: "business_plan_document", maxCount: 1 }, { name: "logo", maxCount: 1 }]), isAuthenticated, createCooperative);
router.get("/", isAuthenticated, getCooperatives);
router.post("/join", isAuthenticated, joinCooperative);
router.post("/join/approve", isAuthenticated, isPlatformAdmin, approveCooperativeJoin);
export { router as cooperativesRoutes };
