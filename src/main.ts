import env from "dotenv";
import Koa from "koa";
import logger from "koa-morgan";
import helmet from "koa-helmet";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import { currenciesRouter, userRouter, authRouter } from "./routers";
import { connectToDB } from "./tools/mongo";
import { NODE_ENV } from "./tools/env";

env.config();

const app: Koa = new Koa();
const PORT = (NODE_ENV !== "TEST" && process.env.PORT) || "4444";

const server = app
  .use(logger("tiny"))
  .use(helmet())
  .use(cors())
  .use(bodyParser())
  .use(currenciesRouter.routes())
  .use(currenciesRouter.allowedMethods())
  .use(userRouter.routes())
  .use(userRouter.allowedMethods())
  .use(authRouter.routes())
  .use(authRouter.allowedMethods())
  .listen(PORT, async () => {
    await connectToDB();
    console.log(`>>> 🌍 >>> Server running on port >>> ${PORT}`);
  });

//module.exports = { app };
export { server };
