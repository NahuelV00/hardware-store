import { Prisma } from "@prisma/client";
import prismadb from "../config/db";
import { CustomErrorImpl, ModifySubCategoryProps, NewSubCategoryProps, SubCategoryProps } from "../types/types";

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

//----------------- MODIFY SUBCATEGORY SERVICE --------------------
const modifySubCategoryService = async (data: ModifySubCategoryProps, subCategoryId: string) => {
  if (!subCategoryId) {
    throw new CustomErrorImpl(400, "Subcategory ID is required.");
  }
  try {
    const subCategoryModified = await prismadb.subCategory.update({
      where: {
        id: subCategoryId,
      },
      data: {
        name: data.name,
      },
    });
    return subCategoryModified;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      // Prisma error when no record is found
      throw new CustomErrorImpl(404, "Subcategory not found.");
    }
    // Manejo de otros errores de base de datos
    throw new CustomErrorImpl(500, "Internal server error.");
  }
};

//---------------- DELETE SUBCATEGORY SERVICE --------------------
const deleteSubCategoryService = async (subCategoryId: string) => {
  if (!subCategoryId) {
    throw new CustomErrorImpl(400, "Subcategory ID is required.");
  }

  try {
    await prismadb.subCategory.delete({
      where: {
        id: subCategoryId,
      },
    });
    return true;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      // Prisma error when no record is found
      throw new CustomErrorImpl(404, "Subcategory not found.");
    }
    // Manejo de otros errores de base de datos
    throw new CustomErrorImpl(500, "Internal server error.");
  }
};

export { createSubCategoryService, modifySubCategoryService, deleteSubCategoryService };
