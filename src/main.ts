import Koa from 'koa';
import logger from 'koa-morgan';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import env from 'dotenv';

env.config();

const port = process.env.PORT || '4444';

const app: Koa = new Koa();

// Enable cors with default options
app.use(cors());
app.use(bodyParser());

// Logger
app.use(logger('tiny'));

// Enable bodyParser with default options
app.use(bodyParser());

app.use(async (ctx: Koa.Context) => {
  ctx.body = 'Hello world';
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
