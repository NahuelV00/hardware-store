import { Request, Response } from "express";
import { createUserService } from "../services/authServices";
import { CustomErrorImpl, NewUserProps } from "../types/types";

const createUserController = async (req: Request, res: Response) => {
  const userData: NewUserProps = req.body;
  try {
    const newUser = await createUserService(userData);
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
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
  }
};

export { createUserController };
