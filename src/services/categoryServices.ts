import prismadb from "../config/db";
import { CategoryProps, CustomErrorImpl, NewCategoryProps } from "../types/types";

const getAllCategoriesService = async (): Promise<CategoryProps[]> => {
  try {
    const categories = await prismadb.category.findMany();
    return categories;
  } catch (error) {
    throw new CustomErrorImpl(500, "Internal Server Error.");
  }
};

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

export { getAllCategoriesService, createCategoryService };
