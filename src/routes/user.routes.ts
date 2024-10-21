import express, { Request, Response } from "express";
import { createUserController, loginController } from "../controller/authController";

const router = express.Router();

router.post("/register", (req: Request, res: Response) => {
  createUserController(req, res);
});

router.post("/login", (req: Request, res: Response) => {
  loginController(req, res);
});

//TODO: Change password, Forgot Password

export default router;
