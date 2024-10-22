import { Response } from "express";
import { CustomErrorImpl, CustomRequest, NewCategoryProps } from "../types/types";
import { isAdmin } from "../services/authServices";
import { createCategoryService, deleteCategoryService, getAllCategoriesService, modifyCategoryService } from "../services/categoryServices";

//------------------ GET ALL CATEGORIES CONTROLLER FUNCTION ----------------------
const getAllCategoriesController = async (_req: CustomRequest, res: Response) => {
  try {
    //Call getAllService
    const allCategories = await getAllCategoriesService();
    return res.status(201).json({
      success: true,
      data: allCategories,
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

//------------------ CREATE CATEGORIES CONTROLLER FUNCTION ----------------------
const createCategoryController = async (req: CustomRequest, res: Response) => {
  const data: NewCategoryProps = req.body;
  let userId = req.userId;
  try {
    if (await isAdmin(userId as string)) {
      const newCategory = await createCategoryService(data);
      return res.status(201).json({
        success: true,
        message: "Category created",
        data: newCategory,
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

//------------------ MODIFY CATEGORIES CONTROLLER FUNCTION ----------------------
const modifyCategoryController = async (req: CustomRequest, res: Response) => {
  const newData: NewCategoryProps = req.body;
  let categoryId: string = req.params.categoryId;
  let userId = req.userId;
  try {
    if (await isAdmin(userId as string)) {
      const modifiedCategory = await modifyCategoryService(newData, categoryId);
      return res.status(201).json({
        success: true,
        message: "Category modified correctly.",
        data: modifiedCategory,
      });
    }
    throw new CustomErrorImpl(404, "Unauthorized.");
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

//------------------ DELETE CATEGORIES CONTROLLER FUNCTION ----------------------
const deleteCategoryController = async (req: CustomRequest, res: Response) => {
  let categoryId: string = req.params.categoryId;
  let userId = req.userId;
  try {
    if (await isAdmin(userId as string)) {
      await deleteCategoryService(categoryId);
      return res.status(201).json({
        success: true,
        message: "Category delete correctly.",
      });
    }
    throw new CustomErrorImpl(404, "Unauthorized.");
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

export { getAllCategoriesController, createCategoryController, modifyCategoryController, deleteCategoryController };
