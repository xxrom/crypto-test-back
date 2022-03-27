import * as Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import * as User from './user';
import {generateTokens} from './token';

const router = new Router();

router.post('/', bodyParser(), async (ctx: Koa.Context) => {
  console.log('ctx', ctx, ctx.request.body);
  const isAuthorized = await User.isAuthorized(ctx.request.body);

  if (isAuthorized) {
    const tokens = await generateTokens('user');

    console.log('tokens', tokens);

    ctx.status = 200;
    ctx.body = tokens;
  } else {
    ctx.status = 401;
    ctx.body = {err: {message: 'Error: from server (401)'}};
  }
});

export default router;
