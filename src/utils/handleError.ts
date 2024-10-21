import { Response } from "express";
import { CustomErrorImpl } from "../types/types";

export const handleError = (res: Response, error: Error) => {
  if (error instanceof CustomErrorImpl) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error.",
  });
};
