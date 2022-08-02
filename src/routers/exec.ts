import * as Koa from "koa";
import Router from "koa-router";
import { exec } from "child_process";

export const execRouter = new Router();

const execPromise = async ({ command = "ls -la" }) =>
  new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
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

  const execResult = await execPromise({ command }).then((res) =>
    JSON.stringify(res)
  );

  ctx.status = 200;
  ctx.body = execResult;
});
