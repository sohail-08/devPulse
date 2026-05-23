import type { Request, Response, NextFunction } from "express";

export const validateCreateIssue = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, type } = req.body;

  if (!title || !description || !type) {
    return res.status(400).json({
      success: false,
      message: "title, description and type are required",
    });
  }

  if (title.length > 150) {
    return res.status(400).json({
      success: false,
      message: "Title must be under 150 characters",
    });
  }

  if (description.length < 20) {
    return res.status(400).json({
      success: false,
      message: "Description must be at least 20 characters",
    });
  }

  if (!["bug", "feature_request"].includes(type)) {
    return res.status(400).json({
      success: false,
      message: "Invalid issue type",
    });
  }

  next();
};