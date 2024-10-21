import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY as string;

export const generateToken = (payload: object): string => {
  let token = jwt.sign(payload, secretKey, { expiresIn: "3h" });
  return token;
};

export const verifyToken = (token: string): object | string => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
