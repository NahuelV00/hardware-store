import { Prisma } from "@prisma/client";
import prismadb from "../config/db";
import { CategoryProps, CustomErrorImpl, NewCategoryProps } from "../types/types";

//------------------- Get All Categories Services -----------------------------------
const getAllCategoriesService = async () => {
  try {
    //getAllCategory from DB
    const categories = await prismadb.category.findMany({
      include: {
        subCategories: {
          select: {
            id: true,
            name: true,
            isActive: true,
          },
        },
      },
    });
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

const modifyCategoryService = async (data: NewCategoryProps, categoryId: string) => {
  //Search category in DB
  const existCategory: CategoryProps | null = await prismadb.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  //Validate existing Category
  if (!existCategory) {
    throw new CustomErrorImpl(404, "Category not found.");
  }

  try {
    //Modified category
    const categoryModified = await prismadb.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name: data.name,
      },
    });
    return categoryModified;
  } catch (error) {
    throw new CustomErrorImpl(500, "Internal Server Error.");
  }
};

//---------------- DELETE CATEGORY SERVICE ----------------------------
const deleteCategoryService = async (categoryId: string): Promise<boolean> => {
  if (!categoryId) {
    throw new CustomErrorImpl(400, "Category ID is required.");
  }
  try {
    await prismadb.category.delete({
      where: {
        id: categoryId,
      },
    });
    return true;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      // Prisma error when no record is found
      throw new CustomErrorImpl(404, "Category not found.");
    }
    // Manejo de otros errores de base de datos
    throw new CustomErrorImpl(500, "Internal server error.");
  }
};

export { getAllCategoriesService, createCategoryService, modifyCategoryService, deleteCategoryService };
