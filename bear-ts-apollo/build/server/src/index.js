"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const next = require("next");
const _debug = require("debug");
const LRUCache = require("lru-cache");
const app_1 = require("./app");
const postgres_1 = require("./helpers/db/postgres");
const config_1 = require("./config");
const debug = _debug('bear:app');
const PORT = config_1.default.server.port;
const HOST = config_1.default.server.host;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();
// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
    max: 100,
    maxAge: 1000 * 60 * 60 // 1hour
});
let parentApp;
let server;
function start() {
    debug('initializing server creation procedure...');
    // connect to db
    postgres_1.initializeDb()
        .then(() => {
        console.log('Database connected successfully');
        app
            .prepare()
            .then(() => {
            parentApp = app_1.setupParentApp();
            server = http.createServer(parentApp);
            // Use the `renderAndCache` utility defined below to serve pages
            parentApp.get('/', (req, res) => {
                renderAndCache(req, res, '/', {});
            });
            parentApp.get('/about/:id', (req, res) => {
                const queryParams = { id: req.params.id };
                renderAndCache(req, res, '/about', queryParams);
            });
            parentApp.get('/about', (req, res) => {
                return app.render(req, res, '/about', req.query);
            });
            parentApp.get('/contact', (req, res) => {
                return app.render(req, res, '/contact', req.query);
            });
            parentApp.get('/error', (req, res) => {
                return app.render(req, res, '/error', req.query);
            });
            parentApp.get('*', (req, res) => {
                return handle(req, res);
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
        });
    })
        .catch((err) => {
        console.log(err);
        process.exit(1);
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
function renderAndCache(req, res, pagePath, queryParams) {
    // If we have a page in the cache, let's serve it
    if (ssrCache.has(req.url)) {
        console.log(`CACHE HIT: ${req.url}`);
        res.send(ssrCache.get(req.url));
        return;
    }
    // If not let's render the page into HTML
    app.renderToHTML(req, res, pagePath, queryParams)
        .then((html) => {
        // Let's cache this page
        console.log(`CACHE MISS: ${req.url}`);
        ssrCache.set(req.url, html);
        res.send(html);
    })
        .catch((err) => {
        app.renderError(err, req, res, pagePath, queryParams);
    });
}
//# sourceMappingURL=index.js.map