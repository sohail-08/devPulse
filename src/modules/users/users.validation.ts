import type { Request, Response, NextFunction } from "express";

export const validateUpdateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email } = req.body;

  if (!name && !email) {
    return res.status(400).json({
      success: false,
      message: "At least one field (name or email) is required",
    });
  }

  if (email && !email.includes("@")) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  next();
};