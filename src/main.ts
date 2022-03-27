import Koa from 'koa';
import logger from 'koa-morgan';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import env from 'dotenv';
import router from './router';

env.config();

const port = process.env.PORT || '4444';

const app: Koa = new Koa();

app
  .use(logger('tiny'))
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(bodyParser())
  .use(async (ctx: Koa.Context) => {
    ctx.body = 'Hello world';
  })
  .listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
