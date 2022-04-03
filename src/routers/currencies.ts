import Router from 'koa-router';
import {db} from '../main';
import {ax} from '../tools/ax';

export const currenciesRouter = new Router();

currenciesRouter.get('/', async ctx => {
  ctx.body = `${db?.readyState || 'null'} - readyState for mongoDB`;
});

currenciesRouter.get('/currencies/ticker', async ctx => {
  const res = await ax({url: '/currencies/ticker'});

  console.log('res', res, JSON.stringify(res?.data));
  ctx.body = JSON.stringify(res?.data);
});

currenciesRouter.get('/currencies/convert/:from/:to', async ctx => {
  const {from, to} = ctx?.params;

  const res = await ax({
    url: `/currencies/ticker?ids=${from},${to}`,
  });

  const [fromItem] = res?.data.filter(({id}: any) => id === from);
  const [toItem] = res?.data.filter(({id}: any) => id === to);

  console.log('from', fromItem.id);
  console.log('to', toItem.id);

  const convert = toItem?.price / fromItem?.price;

  ctx.body = JSON.stringify(convert);
});
