import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY as string;

/**
 * Generates a JSON Web Token (JWT) for the given payload.
 *
 * @param {object} payload - The data to be embedded within the token.
 * @returns {string} The generated JWT as a string.
 */
export const generateToken = (payload: object): string => {
  let token = jwt.sign(payload, secretKey, { expiresIn: "3h" });
  return token;
};

/**
 * Verifies the given token using a predefined secret key.
 *
 * @param {string} token - The token to be verified.
 * @returns {object|string} - The decoded token object if verification is successful, otherwise throws an error.
 * @throws {Error} - Throws an error if the token is invalid or expired.
 */
export const verifyToken = (token: string): object | string => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
