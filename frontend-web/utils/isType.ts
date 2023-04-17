import { IUser } from "@/utils/interfaces";

export const isIUser = (data: any): data is IUser => {
  return (
    typeof data === "object" &&
    "email" in data &&
    "about" in data &&
    "authorStatus" in data &&
    "avatar" in data &&
    "exp" in data &&
    "iat" in data &&
    "id" in data &&
    "mobile" in data &&
    "role" in data
  );
};
