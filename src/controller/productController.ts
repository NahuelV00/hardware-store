import { Response } from "express";
import { CustomErrorImpl, CustomRequest, ModifyProductProps, NewProductProps } from "../types/types";
import { isAdmin } from "../services/authServices";
import { createProductService, getAllProductsService, modifyProductService } from "../services/productServices";

const getAllProductsController = async (_req: CustomRequest, res: Response) => {
  try {
    const products = await getAllProductsService();
    return res.status(201).json({
      success: true,
      data: products,
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

const createProductController = async (req: CustomRequest, res: Response) => {
  const data: NewProductProps = req.body;
  let userId = req.userId;
  try {
    if (await isAdmin(userId as string)) {
      const newProduct = await createProductService(data);
      return res.status(201).json({
        success: true,
        message: "Product created",
        data: newProduct,
      });
    }
    throw new CustomErrorImpl(404, "Unauthorized");
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

const modifyProductController = async (req: CustomRequest, res: Response) => {
  const newData: ModifyProductProps = req.body;
  let categoryId: string = req.params.productId;
  let userId = req.userId;

  try {
    if (await isAdmin(userId as string)) {
      const modifiedProduct = await modifyProductService(newData, categoryId);
      return res.status(200).json({
        success: true,
        message: "Product modified correctly.",
        data: modifiedProduct,
      });
    }
    throw new CustomErrorImpl(404, "Unauthorized");
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

export { getAllProductsController, createProductController, modifyProductController };
