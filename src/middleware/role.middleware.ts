import type { Request, Response, NextFunction } from "express";

const roleMiddleware = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: insufficient permissions",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Role verification failed",
      });
    }
  };
};

export default roleMiddleware;