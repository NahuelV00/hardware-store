import prismadb from "../config/db";
import { CustomErrorImpl, NewSubCategoryProps, SubCategoryProps } from "../types/types";

//------------------ CREATE SUBCATEGORY SERVICE ---------------------
const createSubCategoryService = async (data: NewSubCategoryProps): Promise<SubCategoryProps> => {
  const existSubCategory = await prismadb.subCategory.findFirst({
    where: {
      name: data.name,
    },
  });

  if (!!existSubCategory) {
    throw new CustomErrorImpl(400, "Subcategory already exist.");
  }
  try {
    const newSubCategory: SubCategoryProps = await prismadb.subCategory.create({
      data: {
        name: data.name,
        categoryId: data.categoryId,
      },
    });
    return newSubCategory;
  } catch (error) {
    throw new CustomErrorImpl(500, "Internal Server Error.");
  }
};

export { createSubCategoryService };
