import express, { NextFunction, Response } from "express";
import { createCategoryController } from "../controller/categoryController";
import { checkAuth } from "../middleware/checkAuth";
import { CustomRequest } from "../types/types";

const router = express.Router();

router.post(
  "/",
  (req: CustomRequest, res: Response, next: NextFunction) => {
    checkAuth(req, res, next);
  },
  (req: CustomRequest, res: Response) => {
    createCategoryController(req, res);
  }
);

export default router;
