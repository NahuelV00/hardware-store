import { UserProps, UserSafeProps } from "../types/types";

export function omitSensitiveData(user: UserProps): UserSafeProps {
  const { id, name, lastName, email, isAdmin } = user;

  return {
    id,
    name,
    lastName,
    email,
    isAdmin,
  };
}
