import env from "dotenv";
env.config();

import Koa from "koa";
import logger from "koa-morgan";
import helmet from "koa-helmet";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import { currenciesRouter, userRouter, authRouter } from "./routers";
import mongoose from "mongoose";
import { UserData } from "./routers/user";

const port = process.env.PORT || "4444";

const app: Koa = new Koa();

// db ***
export const mongodbIP = "mongodb://192.168.3.15:27017/test_000";

const connectToDB = async () => {
  console.log("Start connecting to Mongo");

  try {
    await mongoose.connect(mongodbIP);
    console.log("Mongo - connected");

    const mockAdminEmail = "adming@adming.com";
    const mockAdmin = await UserData.find({ email: mockAdminEmail }).exec();

    if (mockAdmin.length > 0) {
      console.log("Mock Admin: exists");
      // We found mock admins
      return;
    }

    // Don't have mock admins in DB => add mock new one
    const admin = new UserData({
      email: mockAdminEmail,
      password: "admin",
    });

    admin.save((err: any) => {
      if (err) {
        return console.log("Mock admin: error saving data", err);
      }

      console.log("Mock Admin: new admin data saved");
    });
  } catch (error) {
    console.error("Error: ConnectDB", error.message);
  }
};

const server = app
  .use(logger("tiny"))
  .use(helmet())
  .use(cors())
  .use(currenciesRouter.routes())
  .use(currenciesRouter.allowedMethods())
  .use(userRouter.routes())
  .use(userRouter.allowedMethods())
  .use(authRouter.routes())
  .use(authRouter.allowedMethods())
  .use(bodyParser())
  .use(async (ctx: Koa.Context) => {
    ctx.body = "Hello world";
  })
  .listen(port, async () => {
    if (process.env.ENV !== "TEST") {
      await connectToDB();
    }
    console.log(`>>> 🌍 >>> Server running on port >>> ${port}`);
  });

//module.exports = { app };
export { server };
