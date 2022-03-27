"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_morgan_1 = __importDefault(require("koa-morgan"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const cors_1 = __importDefault(require("@koa/cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = __importDefault(require("./router"));
dotenv_1.default.config();
const port = process.env.PORT || '4444';
const app = new koa_1.default();
app
    .use((0, koa_morgan_1.default)('tiny'))
    .use(router_1.default.routes())
    .use(router_1.default.allowedMethods())
    .use((0, cors_1.default)())
    .use((0, koa_bodyparser_1.default)())
    .use(async (ctx) => {
    ctx.body = 'Hello world';
})
    .listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=main.js.map