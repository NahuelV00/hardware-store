import express, { NextFunction, Response } from "express";
import { checkAuth } from "../middleware/checkAuth";
import { CustomRequest } from "../types/types";
import { createProductController, getAllProductsController, modifyProductController } from "../controller/productController";

const router = express.Router();

router.get("/", (req: CustomRequest, res: Response) => {
  getAllProductsController(req, res);
});

//create product route
router.post(
  "/",
  (req: CustomRequest, res: Response, next: NextFunction) => {
    checkAuth(req, res, next);
  },
  (req: CustomRequest, res: Response) => {
    createProductController(req, res);
  }
);

router.patch(
  "/:productId",
  (req: CustomRequest, res: Response, next: NextFunction) => {
    checkAuth(req, res, next);
  },
  (req: CustomRequest, res: Response) => {
    modifyProductController(req, res);
  }
);

export default router;
