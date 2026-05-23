import type { Request, Response } from "express";
import * as userService from "./users.service";

/* GET ALL USERS */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersService();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* GET SINGLE USER */
export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getSingleUserService(
      Number(req.params.id)
    );

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};