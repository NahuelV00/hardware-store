import { Response } from "express";
import { CustomErrorImpl, CustomRequest, ModifySubCategoryProps, NewSubCategoryProps } from "../types/types";
import { isAdmin } from "../services/authServices";
import { createSubCategoryService, deleteSubCategoryService, modifySubCategoryService } from "../services/subCategoryServices";

//------------------ CREATE SUB CATEGORY CONTROLLER FUNCTION ----------------------
const createSubCategoryController = async (req: CustomRequest, res: Response) => {
  const data: NewSubCategoryProps = req.body;
  let userId = req.userId;
  try {
    if (await isAdmin(userId as string)) {
      const newSubCategory = await createSubCategoryService(data);
      return res.status(201).json({
        success: true,
        message: "Subcategory created",
        data: newSubCategory,
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

//------------------ MODIFY SUB CATEGORY CONTROLLER FUNCTION ----------------------
const modifySubCategoryController = async (req: CustomRequest, res: Response) => {
  const newData: ModifySubCategoryProps = req.body;
  let categoryId: string = req.params.subcategoryId;
  let userId = req.userId;

  try {
    if (await isAdmin(userId as string)) {
      const modifiedSubCategory = await modifySubCategoryService(newData, categoryId);
      return res.status(200).json({
        success: true,
        message: "Subcategory created",
        data: modifiedSubCategory,
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

//------------------ DELETE SUB CATEGORY CONTROLLER FUNCTION ----------------------
const deleteSubCategoryController = async (req: CustomRequest, res: Response) => {
  let categoryId: string = req.params.subcategoryId;
  let userId = req.userId;
  try {
    if (await isAdmin(userId as string)) {
      await deleteSubCategoryService(categoryId);
      return res.status(200).json({
        success: true,
        message: "Subcategory delete correctly.",
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

export { createSubCategoryController, modifySubCategoryController, deleteSubCategoryController };
