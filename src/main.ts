import env from "dotenv";
env.config();

import Koa from "koa";
import logger from "koa-morgan";
import helmet from "koa-helmet";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import { currenciesRouter, userRouter } from "./routers";
import mongoose from "mongoose";

const port = process.env.PORT || "4444";

const app: Koa = new Koa();

// db ***
export const mongodbIP = "mongodb://192.168.3.15:27017/test_0";

const connectToDB = async () => {
  console.log("Start connecting to Mongo");

  try {
    await mongoose.connect(mongodbIP);
    console.log("Mongo - connected");
  } catch (error) {
    console.error("Error: ConnectDB", error.message);
  }
};

connectToDB();

app
  .use(logger("tiny"))
  .use(helmet())
  .use(cors())
  .use(currenciesRouter.routes())
  .use(userRouter.routes())
  .use(currenciesRouter.allowedMethods())
  .use(userRouter.allowedMethods())
  .use(bodyParser())
  .use(async (ctx: Koa.Context) => {
    ctx.body = "Hello world";
  })
  .listen(port, () => {
    console.log(`>>> 🌍 >>> Server running on port >>> ${port}`);
  });
