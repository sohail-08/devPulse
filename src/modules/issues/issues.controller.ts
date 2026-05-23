import type { Request, Response } from "express";
import * as issueService from "./issues.service";

/* CREATE */
export const createIssue = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const result = await issueService.createIssueService(req.body, userId);

    res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* GET ALL */
export const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getAllIssuesService(req.query);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* GET ONE */
export const getSingleIssue = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getSingleIssueService(
      Number(req.params.id)
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* UPDATE */
export const updateIssue = async (req: Request, res: Response) => {
  try {
    const result = await issueService.updateIssueService(
      Number(req.params.id),
      req.body,
      req.user!
    );

    res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* DELETE */
export const deleteIssue = async (req: Request, res: Response) => {
  try {
    await issueService.deleteIssueService(Number(req.params.id));

    res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};