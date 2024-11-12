import { Request } from "express";
import {Order, OrderStatus} from "@prisma/client";

//-------------- USER MODEL ---------------
//Full user props
export interface UserProps {
  id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}
//Secure Info
export interface UserSafeProps {
  id: string;
  username: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

//Necesary info to create user
export type NewUserProps = Omit<UserProps, "id" | "isAdmin">;

//Necesary info to log In
export type LoginProps = Pick<UserProps, "email" | "password">;

//---------------------- CATEGORY MODEL ----------------------
export interface CategoryProps {
  id: string;
  name: string;
  isActive: boolean;
  subCategories?: SensitiveSubCategoryProps[];
}
export type NewCategoryProps = Omit<CategoryProps, "id" | "isActive" | "subCategories">;

//-------------------- SUBCATEGORY MODEL ---------------------
export interface SubCategoryProps {
  id: string;
  name: string;
  isActive: boolean;
  categoryId: string;
}

export type NewSubCategoryProps = Omit<SubCategoryProps, "id" | "isActive">;
export type ModifySubCategoryProps = Omit<SubCategoryProps, "id" | "isActive" | "categoryId">;
export type SensitiveSubCategoryProps = Omit<SubCategoryProps, "categoryId">;

//------------------- CUSTOM ERROR ---------------------------
export interface CustomError {
  statusCode: number;
  message: string;
}

export class CustomErrorImpl extends Error implements CustomError {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message); // Llamamos al constructor de Error
    this.statusCode = statusCode;
    this.message = message;
    // Esto asegura que la instancia personalizada se mantenga al lanzar el error
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name; // Nombre de la clase
  }
}

//--------------- CUSTOM REQUEST -----------------

export interface CustomRequest extends Request {
  userId?: string;
}

//------------- PRODUCT MODEL ----------------------
export interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  subCategoryId: string;
  //stock relation
  stock?: Stock | null;
}

export type NewProductProps = Omit<ProductProps, "id" | "isActive" | "createdAt" | "updatedAt" | "stock"> & {
  quantity: number;
};

export interface ModifyProductProps {
  name?: string;
  description?: string;
  price?: number;
  isActive?: boolean;
  subCategoryId?: string;
  stock?: {
    quantity?: number;
  };
}

export interface Stock {
  id: string;
  quantity: number;
  productId: string;

  //Update Stock history
  //updates StockUpdate[]
}

//--------------- ORDERS PROPS -------------------
export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface OrderProps {
  id: string;
  userId: string;
  orderItems: OrderItem[];
  totalAmount: number
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  address?: string | null;
  shippingMethod?: string | null;
}

export type NewOrderItem = Omit<OrderItem, "id" | "price" | "totalPrice">

export interface NewOrderProps {
  items: NewOrderItem[];
  address?: string;
  shippingMethod?: string;
}

export interface UpdateOrderStatusProps {
  orderId: string;
  status: OrderStatus;
}

export interface CreateOrderResponse {
  order: Order;
  message: string;
}

export interface GetOrdersByUserResponse {
  orders: Order[];
}

export interface GetOrderByIdResponse {
  order: Order | null;
}

export interface UpdateOrderStatusResponse {
  order: Order;
  message: string;
}