import Koa from "koa";
import { userSchema } from "./schema";
//import { HydratedDocument } from "mongoose";
import { IUser, User } from ".";

export const isAuthenticated = async (req: Koa.Request) => {
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

  //const correctPassword = await redis.getAsync(value.username);
  //const correctEmail = "admin@gmail.com";
  //const correctPassword = "12341234";

  return email === foundUser?.email && password === foundUser?.password;
};
