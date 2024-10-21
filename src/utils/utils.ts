import { UserProps, UserSafeProps } from "../types/types";

export function omitSensitiveData(user: UserProps): UserSafeProps {
  const { id, name, username, email, isAdmin } = user;

  return {
    id,
    name,
    username,
    email,
    isAdmin,
  };
}
