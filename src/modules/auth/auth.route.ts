import { Router } from "express";
import * as authController from "./auth.controller";
import {
  validateLogin,
  validateSignup,
} from "./auth.validation";

const router = Router();

router.post("/signup", validateSignup, authController.signup);
router.post("/login", validateLogin, authController.login);

export default router;