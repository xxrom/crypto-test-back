import Koa from 'koa';
import logger from 'koa-morgan';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import env from 'dotenv';
import router from './router';
import axios from 'axios';

env.config();

const port = process.env.PORT || '4444';

// axios Start ------------------------

export const axiosMy: any = axios.create({
  timeout: 1000,
  baseURL: 'https://api.nomics.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    key: process.env.API_KEY_NOMICS,
  },
});

const memoObj: {[key: string]: any} = {};

export type axProps = {
  url: string;
  method?: 'get' | 'post';
};
export const ax = async ({url, method = 'get'}: axProps) => {
  if (!memoObj[url]) {
    console.info('Save to memo', url);

    const res = await axiosMy[method](url);
    memoObj[url] = res;
  }

  return memoObj[url];
};

// axios end -------------------------

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
