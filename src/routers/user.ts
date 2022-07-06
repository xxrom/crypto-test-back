import * as Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { HydratedDocument } from "mongoose";
import { User, IUser } from "../models";

export const userRouter = new Router();

userRouter.get("/user/get-data", async (ctx: Koa.Context) => {
  // find all users
  await User.find().then((res: any) => {
    console.log("get: /user/get-data => res", res);

    ctx.body = JSON.stringify(res);
  });
});

userRouter.post("/user/post-data", bodyParser(), async (ctx: Koa.Context) => {
  // add new user
  /*
  curl -d '{ "email": "aa@g.com", "password":"a2"}' -H "Content-Type: application/json" -X POST http://192.168.3.150:4444/user/post-data 
  */
  console.log("post: /user/post-data", ctx.request.body);
  const { email, password } = ctx.request.body;

  const item = {
    email,
    password,
  };
  console.log("post: /user/post-data", item);

  try {
    const newUser: HydratedDocument<IUser> = new User(item); // add new user
    const savedUser = await newUser.save(); // save it inside mongodb

    console.log("saved user: ", savedUser);
    ctx.body = JSON.stringify(savedUser);
  } catch (err) {
    console.log("err", err);

    ctx.status = 500;
    ctx.body = err.message || "error: adding new user";
  }
});

userRouter.post("/user/update-data", bodyParser(), async (ctx: Koa.Context) => {
  // Updating existing user
  /*
     curl -d '{ "email": "AA@g.com", "password":"AAA222", "id": "624e314217f0b89bbeec5fce"}' -H "Content-Type: application/json" -X POST http://192.168.3.150:4444/user/update-data
   */
  console.log("post: /user/update-data", ctx.request.body);
  const { email, password, id } = ctx.request.body;

  User.findById(id, async (err: any, doc: HydratedDocument<IUser>) => {
    if (err) {
      console.error("error", err);
    }

    doc.email = email;
    doc.password = password;

    const updatedUser = await doc.save(); // update new data

    ctx.body = JSON.stringify(updatedUser);
  });
});

userRouter.post("/user/delete-data", bodyParser(), async (ctx: Koa.Context) => {
  // Delete user
  /*
     curl -d '{ "id": "624e31143051b643281e3666"}' -H "Content-Type: application/json" -X POST http://192.168.3.150:4444/user/delete-data
  */

  console.log("post: /user/delete-data", ctx.request.body);
  const id = ctx?.request?.body?.id;

  User.findOneAndDelete(id).exec();

  ctx.body = JSON.stringify(id);
});
