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
app.listen(9000, () => {
    console.log('>>| Listen on 9000');
});
/**
 * demo for test
 * */
function add(a, b) {
    return a + b;
}
exports.add = add;
//# sourceMappingURL=index.js.map