import { NextFunction, Response } from "express";
import { CustomRequest } from "../types/types";
import jwt from "jsonwebtoken";

const secretKey: string = process.env.SECRET_KEY as string;

export const checkAuth = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized.",
    });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as { id: string };
    req.userId = decoded.id;

    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      // Invalid or expired Token
      return res.status(401).json({ message: "Token is invalid or expired, authorization denied" });
    }
    //INTERNAL SERVER ERROR
    console.error("[-] Internal server error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
