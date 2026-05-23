import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization token missing",
            });
        }

        const token = authHeader.split(" ")[1] || authHeader;

        const decoded = jwt.verify(
            token,
            config.jwt_secret as string
        ) as {
            id: number;
            name: string;
            role: "contributor" | "maintainer";
        };

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export default authMiddleware;