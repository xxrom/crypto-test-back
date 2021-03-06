import * as Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import * as User from '../user';
import Token from './token';

export const userRouter = new Router();

import {generateTokens} from '../token';
//import mongoose from 'mongoose';

export const authRouter = new Router();

//const {Schema} = mongoose;

// authorization
authRouter.post('/auth', bodyParser(), async (ctx: Koa.Context) => {
  await new Promise((resolve: any) => {
    setTimeout(() => resolve(), 2000);
  }).then(async () => {
    ctx.status = 401;
    ctx.body = {err: {message: 'error from server (401)'}};

    const isAuthorized = await User.isAuthorized(ctx.request.body);

    if (isAuthorized) {
      const tokens = await Token.generatePair(ctx.reqest.body.username);

      console.log('tokens', tokens);

      ctx.status = 200;
      ctx.body = tokens;
    }
  });
});

// update token
authRouter.get('/auth', async (ctx: Koa.Context) => {
  ctx.status = 403;
  ctx.body = {err: {message: 'error from server (403)'}};

  const {authorization} = ctx.headers;
  if (!authorization && !authorization.match(/^Bearer\s/)) return;

  const refresthToken = authorization.replace(/^Bearer\s/, '');
  const {username} = await Token.getPayload(refresthToken);

  const hasValidRefreshToken = await User.hasValidRefreshToken(refresthToken);

  await new Promise((resolve: any) => {
    setTimeout(() => resolve(), 2000);
  }).then(async () => {
    if (hasValidRefreshToken) {
      const tokens = await Token.generatePair(username);

      console.log('tokens', tokens);

      ctx.status = 200;
      ctx.body = tokens;
    }
  });
});
