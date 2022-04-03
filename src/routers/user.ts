import * as Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import * as User from '../user';
import {generateTokens} from '../token';

export const userRouter = new Router();

userRouter.post('/user/auth', bodyParser(), async (ctx: Koa.Context) => {
  console.log('ctx', ctx.request.body);

  const isAuthorized = await User.isAuthorized(ctx.request.body);

  await new Promise((resolve: any) => {
    setTimeout(() => resolve(), 2000);
  }).then(async () => {
    if (isAuthorized) {
      const tokens = await generateTokens('user');

      console.log('tokens', tokens);

      ctx.status = 200;
      ctx.body = tokens;
    } else {
      ctx.status = 401;
      ctx.body = {err: {message: 'error from server (401)'}};
    }
  });
});
