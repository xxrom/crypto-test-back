import Koa from "koa";
import { userSchema } from "./schema";
import { IUser, User } from ".";

export const isAuthenticated = async (req: Partial<Koa.Request> & IUser) => {
  console.log("req", req);

  const { error, value } = userSchema.validate(req) as {
    error: Error;
    value: IUser;
  };

  if (error) {
    return false;
  }

  const { email, password } = value;

  // Find username and password
  const foundUser = await User.findOne({
    email,
  })
    .exec()
    .then((res) => {
      console.log("DB: find user with same username/password => res", res);

      return res;
    });

  console.log("Found User: ", foundUser);

  return email === foundUser?.email && password === foundUser?.password;
};
