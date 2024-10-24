import express, { NextFunction, Response } from "express";
import { CustomRequest } from "../types/types";
import { checkAuth } from "../middleware/checkAuth";
import { createSubCategoryController, deleteSubCategoryController, modifySubCategoryController } from "../controller/subCategoryController";

const router = express.Router();

//create category route
router.post(
  "/",
  (req: CustomRequest, res: Response, next: NextFunction) => {
    checkAuth(req, res, next);
  },
  (req: CustomRequest, res: Response) => {
    createSubCategoryController(req, res);
  }
);

router.patch(
  "/:subcategoryId",
  (req: CustomRequest, res: Response, next: NextFunction) => {
    checkAuth(req, res, next);
  },
  (req: CustomRequest, res: Response) => {
    modifySubCategoryController(req, res);
  }
);

router.delete(
  "/:subcategoryId",
  (req: CustomRequest, res: Response, next: NextFunction) => {
    checkAuth(req, res, next);
  },
  (req: CustomRequest, res: Response) => {
    deleteSubCategoryController(req, res);
  }
);

export default router;
