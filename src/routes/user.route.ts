import { Router } from "express";
import { getDashboardData } from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
const router = Router();
router.get("/dashboard", isAuthenticated, getDashboardData);
export { router as userRoutes };
