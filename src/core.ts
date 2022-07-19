import Koa from "koa";
import logger from "koa-morgan";
import helmet from "koa-helmet";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import cookie from "koa-cookie";
import { currenciesRouter, userRouter, authRouter } from "./routers";

const app: Koa = new Koa();

const core = app
  .use(logger("tiny"))
  .use(helmet())
  .use(cors())
  .use(bodyParser())
  .use(cookie())
  .use(currenciesRouter.routes())
  .use(currenciesRouter.allowedMethods())
  .use(userRouter.routes())
  .use(userRouter.allowedMethods())
  .use(authRouter.routes())
  .use(authRouter.allowedMethods());

export { core };
