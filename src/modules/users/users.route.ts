import { Router } from "express";
import * as userController from "./users.controller";

const router = Router();

/* GET ALL USERS */
router.get("/", userController.getAllUsers);

/* GET SINGLE USER */
router.get("/:id", userController.getSingleUser);

export default router;