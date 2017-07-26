"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const app = new Koa();
app.use(async function (ctx, next) {
    const start = new Date();
    await next();
    console.log(`${ctx.method} ${ctx.url}`);
});
// response
app.use(ctx => {
    ctx.body = 'Hello World';
});
app.listen(9000);
//# sourceMappingURL=index.js.map