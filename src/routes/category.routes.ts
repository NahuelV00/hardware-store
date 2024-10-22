import express, { NextFunction, Response } from "express";
import { createCategoryController, deleteCategoryController, getAllCategoriesController, modifyCategoryController } from "../controller/categoryController";
import { checkAuth } from "../middleware/checkAuth";
import { CustomRequest } from "../types/types";

const router = express.Router();

//get all categories route
router.get("/", (req: CustomRequest, res: Response) => {
  getAllCategoriesController(req, res);
});

//create category route
router.post(
  "/",
  (req: CustomRequest, res: Response, next: NextFunction) => {
    checkAuth(req, res, next);
  },
  (req: CustomRequest, res: Response) => {
    createCategoryController(req, res);
  }
);
router.patch(
  "/:categoryId",
  (req: CustomRequest, res: Response, next: NextFunction) => {
    checkAuth(req, res, next);
  },
  (req: CustomRequest, res: Response) => {
    modifyCategoryController(req, res);
  }
);

router.delete(
  "/:categoryId",
  (req: CustomRequest, res: Response, next: NextFunction) => {
    checkAuth(req, res, next);
  },
  (req: CustomRequest, res: Response) => {
    deleteCategoryController(req, res);
  }
);

export default router;
