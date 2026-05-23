import { Router } from "express";
import * as issueController from "./issues.controller";
import { validateCreateIssue } from "./issues.validation";
import authMiddleware from "../../middleware/auth.middleware";
import roleMiddleware from "../../middleware/role.middleware";

const router = Router();

/* CREATE */
router.post(
  "/",
  authMiddleware,
  validateCreateIssue,
  issueController.createIssue
);

/* GET ALL */
router.get("/", issueController.getAllIssues);

/* GET ONE */
router.get("/:id", issueController.getSingleIssue);

/* UPDATE */
router.patch(
  "/:id",
  authMiddleware,
  issueController.updateIssue
);

/* DELETE (MAINTAINER ONLY) */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("maintainer"),
  issueController.deleteIssue
);

export default router;