import { Request } from "express";

//-------------- USER MODEL ---------------
//Full user props
export interface UserProps {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}
//Secure Info
export interface UserSafeProps {
  id: string;
  name: string;
  lastName: string;
  email: string;
  isAdmin?: boolean;
}

//Necesary info to create user
export type NewUserProps = Omit<UserProps, "id" | "isAdmin">;

//Necesary info to log In
export type LoginProps = Pick<UserProps, "email" | "password">;

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
