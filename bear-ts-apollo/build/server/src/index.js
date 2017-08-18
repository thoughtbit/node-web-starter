"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const _debug = require("debug");
const postgres_1 = require("./helpers/db/postgres");
const config_1 = require("./config");
const debug = _debug('bear:app');
const PORT = config_1.default.server.port;
const HOST = config_1.default.server.host;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();
const server = http.createServer(app);
// connect to db
postgres_1.initializeDb();
console.log('Database connected successfully');
app.prepare().then(() => {
    let server = express();
    server.run = http.createServer(server);
    // Use the `renderAndCache` utility defined below to serve pages
    server.get('/', (req, res) => {
        renderAndCache(req, res, '/');
    });
    server.get('/about/:id', (req, res) => {
        const queryParams = { id: req.params.id };
        renderAndCache(req, res, '/about', queryParams);
    });
    server.get('/about', (req, res) => {
        return app.render(req, res, '/about', req.query);
    });
    server.get('/contact', (req, res) => {
        return app.render(req, res, '/contact', req.query);
    });
    server.get('/error', (req, res) => {
        return app.render(req, res, '/error', req.query);
    });
    server.get('*', (req, res) => {
        return handle(req, res);
    });
    server.run.listen(3000, (err) => {
        if (err)
            throw err;
        console.log(`=> Started on port ${server.run.address().port}`);
    });
});
server.listen(PORT, HOST);
server.on('listening', () => {
    const address = server.address();
    console.log('🚀  Starting server on %s:%s', address.address, address.port);
});
server.on('error', (err) => {
    console.log(`⚠️  ${err}`);
    throw err;
});
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