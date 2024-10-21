import { Response } from "express";
import { CustomErrorImpl, CustomRequest, NewCategoryProps } from "../types/types";
import { isAdmin } from "../services/authServices";
import { createCategoryService } from "../services/categoryServices";

//TODO: get,create, modify, delete categories
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

export { createCategoryController };
