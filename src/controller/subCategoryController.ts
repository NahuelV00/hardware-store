import { Response } from "express";
import { CustomErrorImpl, CustomRequest, NewSubCategoryProps } from "../types/types";
import { isAdmin } from "../services/authServices";
import { createSubCategoryService } from "../services/subCategoryServices";

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

export { createSubCategoryController };
