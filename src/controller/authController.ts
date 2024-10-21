import { Request, Response } from "express";
import { createUserService, loginService } from "../services/authServices";
import { CustomErrorImpl, LoginProps, NewUserProps } from "../types/types";
import { generateToken } from "../utils/jwtUtils";

const createUserController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userData: NewUserProps = req.body;
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

const loginController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userData: LoginProps = req.body;
    const token = generateToken(await loginService(userData));
    return res.status(201).json({
      success: true,
      message: "Successfully login.",
      data: token,
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

export { createUserController, loginController };
