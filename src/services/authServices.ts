import { comparePassword, hashPassword } from "../utils/hashPassword";
import { CustomErrorImpl, LoginProps, NewUserProps, UserProps, UserSafeProps } from "../types/types";
import prismadb from "../config/db";
import { omitSensitiveData } from "../utils/utils";

const createUserService = async (data: NewUserProps): Promise<UserSafeProps> => {
  const { name, password, email, lastName } = data;

  const existUser = await prismadb.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!existUser) {
    throw new CustomErrorImpl(400, "User already exist.");
  }
  try {
    const hashedPassword = await hashPassword(password);
    const user: UserProps = await prismadb.user.create({
      data: {
        name,
        lastName,
        password: hashedPassword,
        email,
      },
    });
    return omitSensitiveData(user);
  } catch {
    throw new CustomErrorImpl(500, "Internal Server Error.");
  }
};

const loginService = async (data: LoginProps): Promise<object> => {
  const { email, password } = data;
  const user = await prismadb.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new CustomErrorImpl(401, "Invalid credentials. Please check your email and password.");
  }
  if (await comparePassword(password, user.password)) {
    throw new CustomErrorImpl(401, "Invalid credentials. Please check your email and password.");
  }

  const jwtData = {
    id: user.id,
    name: user.name,
    lastName: user.lastName,
    isAdmin: user.isAdmin,
  };

  return jwtData;
};

export { createUserService, loginService };
