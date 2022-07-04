import * as Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import * as User from "../user";
//import Token from "./token";

//import { generateTokens } from "../token";

export const authRouter = new Router();

// login / authorization
authRouter.post("/authenticate", bodyParser(), async (ctx: Koa.Context) => {
  console.log("post:/authenticate", ctx.body);

  await new Promise((resolve: any) => {
    setTimeout(() => resolve(), 1000);
  }).then(async () => {
    const isAuthorized = await User.isAuthenticated(ctx.request.body);

    console.log("isAuth", isAuthorized, ctx.request.body);

    if (isAuthorized) {
      //const tokens = await Token.generatePair(ctx.reqest.body.username);

      const tokens = { token: "tttt2" };
      console.log("tokens", tokens);

      ctx.status = 200;
      ctx.body = tokens;
    } else {
      ctx.status = 401;
      ctx.body = JSON.stringify({
        err: { message: "error from server (401)" },
      });
    }
  });
});

// update token
authRouter.post(
  "/authenticate-update",
  bodyParser(),
  async (ctx: Koa.Context) => {
    console.log("get:/authenticate-update", ctx.body);

    const { authorization } = ctx?.headers;

    if (!authorization && !authorization?.match(/^Bearer\s/)) {
      ctx.status = 403;
      ctx.body = { err: { message: "error from server (403)" } };

      return;
    }

    //const refresthToken = authorization.replace(/^Bearer\s/, "");
    //const { username } = await Token.getPayload(refresthToken);

    //const hasValidRefreshToken = await User.hasValidRefreshToken(refresthToken);
    if (0) {
      // !hasValidRefreshToken
      ctx.status = 403;
      ctx.body = { err: { message: "error from server (403)" } };

      return;
    }

    await new Promise((resolve: any) => {
      setTimeout(() => resolve(), 2000);
    }).then(async () => {
      //const tokens = await Token.generatePair(username);
      const tokens = { tt2342: "tadfae3" };

      console.log("tokens", tokens);

      ctx.status = 200;
      ctx.body = tokens;
    });
  }
);
