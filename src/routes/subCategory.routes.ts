import express, { NextFunction, Response } from "express";
import { CustomRequest } from "../types/types";
import { checkAuth } from "../middleware/checkAuth";
import { createSubCategoryController } from "../controller/subCategoryController";

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

/* router.patch(
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
 */

export default router;
