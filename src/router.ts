import * as Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import * as User from './user';
import {generateTokens} from './token';
import {ax} from './ax';
import {db} from './main';

export const currenciesRouter = new Router();

currenciesRouter.get('/', async ctx => {
  ctx.body = `${db?.readyState || 'null'} - readyState for mongo`;
});

currenciesRouter.post('/auth', bodyParser(), async (ctx: Koa.Context) => {
  //console.log('ctx', ctx, ctx.request.body);
  const isAuthorized = await User.isAuthorized(ctx.request.body);

  if (isAuthorized) {
    const tokens = await generateTokens('user');

    //console.log('tokens', tokens);

    ctx.status = 200;
    ctx.body = tokens;
  } else {
    ctx.status = 401;
    ctx.body = {err: {message: 'Error: from server (401)'}};
  }
});

currenciesRouter.get('/currencies/ticket', async ctx => {
  const res = await ax({url: '/currencies/ticker'});

  //console.log('res', res, JSON.stringify(res?.data));
  ctx.body = JSON.stringify(res?.data);
});

currenciesRouter.get('/currencies/convert/:from/:to', async ctx => {
  const {from, to} = ctx?.params;

  const res = await ax({
    url: `/currencies/ticker?ids=${from},${to}`,
  });

  const [fromItem] = res?.data.filter(({id}: any) => id === from);
  const [toItem] = res?.data.filter(({id}: any) => id === to);

  //console.log('from', fromItem.id);
  //console.log('to', toItem.id);

  const convert = toItem?.price / fromItem?.price;

  ctx.body = JSON.stringify(convert);
});
