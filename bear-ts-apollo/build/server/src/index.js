"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const _debug = require("debug");
const app_1 = require("./app");
const postgres_1 = require("./helpers/db/postgres");
const config_1 = require("./config");
const debug = _debug('bear:app');
const PORT = config_1.default.server.port;
const HOST = config_1.default.server.host;
let parentApp;
let server;
function start() {
    debug('initializing server creation procedure...');
    // connect to db
    postgres_1.initializeDb()
        .then(() => {
        console.log('Database connected successfully');
        parentApp = app_1.setupParentApp();
        server = http.createServer(parentApp);
        server.listen(PORT, HOST);
        server.on('listening', () => {
            const address = server.address();
            console.log('🚀  Starting server on %s:%s', address.address, address.port);
        });
        server.on('error', (err) => {
            console.log(`⚠️  ${err}`);
            throw err;
        });
    });
}
exports.default = start;
process.on('SIGINT', () => {
    console.log('shutting down!');
    postgres_1.disconnect(); // 关闭数据库
    server.close();
    process.exit();
});
process.on('uncaughtException', (error) => {
    console.log(`uncaughtException: ${error.message}`);
    console.log(error.stack);
    debug(error.stack);
    process.exit(1);
});
//# sourceMappingURL=index.js.map