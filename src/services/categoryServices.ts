import prismadb from "../config/db";
import { CategoryProps, CustomErrorImpl, NewCategoryProps } from "../types/types";

const createCategoryService = async (data: NewCategoryProps): Promise<CategoryProps> => {
  const existCategory = await prismadb.category.findFirst({
    where: {
      name: data.name,
    },
  });

  if (!!existCategory) {
    console.log(existCategory);
    throw new CustomErrorImpl(400, "Category already exist.");
  }
  try {
    const newCategory: CategoryProps = await prismadb.category.create({
      data: {
        name: data.name,
      },
    });
    return newCategory;
  } catch (error) {
    throw new CustomErrorImpl(500, "Internal Server Error.");
  }
};

export { createCategoryService };
