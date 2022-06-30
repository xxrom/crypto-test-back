import Router from "koa-router";
import { ax, REQUEST_TO_SERVER_TIMEOUT } from "../tools/ax";

export const currenciesRouter = new Router();

currenciesRouter.get("/", async (_ctx) => {
  //ctx.body = `${db?.readyState || 'null'} - readyState for mongoDB`;
});

currenciesRouter.get("/currencies/ticker", async (ctx) => {
  const res = await ax({
    url: "/currencies/ticker",
    timeout: REQUEST_TO_SERVER_TIMEOUT,
  });

  console.log("res", res?.data?.length);
  ctx.body = res?.data;
});

currenciesRouter.get("/currencies/convert/:from/:to", async (ctx) => {
  const { from, to } = ctx?.params;

  const res = await ax({
    url: `/currencies/ticker?ids=${from}&convert=${to}`,
    timeout: REQUEST_TO_SERVER_TIMEOUT,
  });

  const [fromItem] = res?.data?.filter(({ id }: any) => id === from);
  const [toItem] = res?.data?.filter(({ id }: any) => id === to);

  //console.log('from', fromItem.id);
  //console.log('to', toItem.id);

  const convert = toItem?.price / fromItem?.price;

  ctx.body = JSON.stringify(convert);
});
