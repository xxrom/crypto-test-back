import * as Koa from "koa";
import Router from "koa-router";
import { exec } from "child_process";

export const execRouter = new Router();

const execPromise = async () =>
  new Promise((resolve, reject) => {
    exec("ls -la", (err, stdout, stderr) => {
      console.log(stdout, err, stderr);
      if (err) {
        reject(err);
      }

      resolve(stdout);
    });
  });

execRouter.post("/exec", async (ctx: Koa.Context) => {
  const body = ctx?.request?.body;
  console.log("post:/exec", body);

  const { command } = body;
  console.log("command", command);

  ctx.status = 200;
  ctx.body = await execPromise().then((res) => JSON.stringify(res));
});
