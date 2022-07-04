import Koa from "koa";
import { schema } from "./schema";
import { HydratedDocument } from "mongoose";
//import {redis} from '../redis';
import { IUser, UserData } from "../routers/user";

export const isAuthenticated = async (req: Koa.Request) => {
  const {
    error,
    value: { email, password },
  } = schema.validate(req);

  console.log("isAuthorized", error, email, password, req);

  if (error) {
    return false;
  }

  // Mock validation
  const providedEmail = email;
  const providedPassword = password;

  // Find username and password
  const foundUser = await UserData.findById(
    (user: HydratedDocument<IUser>) =>
      user.email === email && user.password === password
  ).then((res) => {
    console.log("DB: find user with same username/password => res", res);
    return res;
  });

  console.log("Found User: ", foundUser);

  //const correctPassword = await redis.getAsync(value.username);
  //const correctEmail = "admin@gmail.com";
  //const correctPassword = "12341234";

  return (
    providedPassword == foundUser.password && providedEmail == foundUser.email
  );
};
