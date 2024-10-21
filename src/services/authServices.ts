import { comparePassword, hashPassword } from "../utils/hashPassword";
import { CustomErrorImpl, LoginProps, NewUserProps, UserProps, UserSafeProps } from "../types/types";
import prismadb from "../config/db";
import { omitSensitiveData } from "../utils/utils";

const createUserService = async (data: NewUserProps): Promise<UserSafeProps> => {
  const { name, password, email, username } = data;

  const existUser = await prismadb.user.findFirst({
    where: {
      OR: [{ email: email || undefined }, { username: username || undefined }],
    },
  });

  if (existUser) {
    throw new CustomErrorImpl(400, "User already exist.");
  }
  try {
    const hashedPassword = await hashPassword(password);
    const user: UserProps = await prismadb.user.create({
      data: {
        username,
        name,
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
  //email = email || username
  const { email, password } = data;
  const user = await prismadb.user.findFirst({
    where: {
      OR: [{ email: email || undefined }, { username: email || undefined }],
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
    username: user.username,
    isAdmin: user.isAdmin,
  };
  return jwtData;
};

const isAdmin = async (userId: string): Promise<boolean> => {
  const user = await prismadb.user.findUnique({
    where: { id: userId },
    select: { isAdmin: true },
  });
  //If user not exist
  if (!user) {
    throw new CustomErrorImpl(401, "Unaothorized");
  }
  //return "isAdmin" state
  return user.isAdmin;
};

export { createUserService, loginService, isAdmin };
