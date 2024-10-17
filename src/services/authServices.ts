import { hashPassword } from "../utils/hashPassword";
import { CustomErrorImpl, NewUserProps } from "../types/types";
import prismadb from "../config/db";

const createUserService = async (data: NewUserProps) => {
  const { name, password, email, lastName } = data;
  const existUser = prismadb.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!existUser) {
    throw new CustomErrorImpl(400, "User already exist.");
  }
  const hashedPassword = await hashPassword(password);
  const user = await prismadb.user.create({
    data: {
      name,
      lastName,
      password: hashedPassword,
      email,
    },
  });
  return user;
};

export { createUserService };
