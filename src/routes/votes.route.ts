import { Router } from "express";
import { castVote, proposeVote } from "../controllers/votes.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
const router = Router();
router.post("/propose", isAuthenticated, proposeVote);
router.post("/cast", isAuthenticated, castVote);
export { router as votesRoutes };
