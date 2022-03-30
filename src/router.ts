import * as Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import * as User from './user';
import {generateTokens} from './token';
import {ax} from './main';

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

/*
var https = require("https");

var options = {
  "method": "GET",
  "hostname": "rest.cryptoapis.io",
  "path": "/v2/wallet-as-a-service/wallets/all-assets",
  "qs": {"context":"yourExampleString","limit":50,"offset":0},
  "headers": {
    "Content-Type": "application/json",
    "X-API-Key": "my-api-key"
  }
};

const apiCall = (passOptions) => { 
  const req = https.request(passOptions, (res: any) => {

    const chunks: Array<Uint8Array> = [];

    res.on("data", function (chunk: any) {
      chunks.push(chunk);
    });

    res.on("end", () => {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  return req.end 
}

req.end();
*/

router.get('/currencies/ticket', async ctx => {
  const res = await ax({url: '/currencies/ticker'});

  //console.log('res', res, JSON.stringify(res?.data));
  ctx.body = JSON.stringify(res?.data);
});

export default router;
