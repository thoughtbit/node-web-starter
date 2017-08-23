"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const next = require("next");
const _debug = require("debug");
const LRUCache = require("lru-cache");
const debug = _debug('bear:app');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
    max: 100,
    maxAge: 1000 * 60 * 60 // 1hour
});
app.prepare().then(() => {
    let server = express();
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
    server.all('*', (req, res) => {
        return handle(req, res);
    });
    server.listen(3000, (err) => {
        if (err)
            throw err;
        console.log('=> Started on port http://localhost:3000');
    });
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
exports.default = app;
//# sourceMappingURL=index.js.map