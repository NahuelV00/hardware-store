import { Prisma } from "@prisma/client";
import prismadb from "../config/db";
import { CustomErrorImpl, ModifyProductProps, NewProductProps, ProductProps } from "../types/types";

const getAllProductsService = async (): Promise<ProductProps[] | undefined> => {
  try {
    const products = await prismadb.product.findMany({
      include: {
        stock: true,
      },
    });
    return products;
  } catch (error) {
    throw new CustomErrorImpl(500, "Internal Server Error.");
  }
};

const createProductService = async (data: NewProductProps): Promise<ProductProps> => {
  const { name, description, price, subCategoryId, quantity } = data;
  try {
    const newProduct = await prismadb.product.create({
      data: {
        name,
        description,
        price,
        subCategoryId,
        stock: {
          create: {
            quantity,
          },
        },
      },
      include: {
        stock: true,
      },
    });

    return newProduct;
  } catch (error) {
    throw new CustomErrorImpl(500, "Internal Server Error.");
  }
};

const modifyProductService = async (data: ModifyProductProps, productId: string) => {
  if (!productId) {
    throw new CustomErrorImpl(400, "Product ID is required.");
  }
  let product = await prismadb.product.findUnique({ where: { id: productId } });

  if (!product) {
    throw new Error("Product not found");
  }
  try {
    const productModified = await prismadb.product.update({
      where: { id: productId },
      data: {
        name: data.name ?? product.name,
        description: data.description ?? product.description,
        price: data.price ?? product.price,
        subCategoryId: data.subCategoryId ?? product.subCategoryId,
        stock: data.stock
          ? {
              update: {
                quantity: data.stock.quantity ?? undefined,
              },
            }
          : undefined,
      },
      include: { stock: true },
    });

    return productModified;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      // Prisma error when no record is found
      throw new CustomErrorImpl(404, "Subcategory not found.");
    }
    // Manejo de otros errores de base de datos
    throw new CustomErrorImpl(500, "Internal server error.");
  }
};

export { getAllProductsService, createProductService, modifyProductService };
