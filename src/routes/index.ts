import { Router } from "express";
import authRoutes from "../modules/auth/auth.route";
import userRoutes from "../modules/users/users.route";
import issueRoutes from "../modules/issues/issues.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/issues", issueRoutes);

export default router;