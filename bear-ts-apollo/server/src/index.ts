import * as http from 'http';
import * as next from 'next';
import * as _debug from 'debug';

const LRUCache = require('lru-cache');

import server from './app';
import { initializeDb, disconnect } from './helpers/db/postgres';
import config from './config';

const debug = _debug('bear:app');

const PORT = config.server.port;
const HOST = config.server.host;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
});

// connect to db
initializeDb();
console.log('Database connected successfully');

let sr = server;
app.prepare().then(() => {
  sr.run = http.createServer(sr);
  // Use the `renderAndCache` utility defined below to serve pages
  sr.get('/', (req, res) => {
    renderAndCache(req, res, '/', {});
  });

  sr.get('/about/:id', (req, res) => {
    const queryParams = { id: req.params.id };
    renderAndCache(req, res, '/about', queryParams);
  });

  sr.get('/about', (req, res) => {
    return app.render(req, res, '/about', req.query);
  });

  sr.get('/contact', (req, res) => {
    return app.render(req, res, '/contact', req.query);
  });

  sr.get('/error', (req, res) => {
    return app.render(req, res, '/error', req.query);
  });

  sr.get('*', (req, res) => {
    return handle(req, res);
  });

  sr.run.listen(3000, (err) => {
    if (err) throw err;
    console.log(`=> Started on port ${sr.run.address().port}`);
  });

  sr.listen(PORT, HOST);
  sr.on('listening', () => {
    const address = sr.address();
    console.log(
      '🚀  Starting server on %s:%s',
      address.address,
      address.port
    );
  });
  sr.on('error', (err) => {
    console.log(`⚠️  ${err}`);
    throw err;
  });

});

process.on('SIGINT', () => {
  console.log('shutting down!');
  disconnect(); // 关闭数据库
  sr.close();
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
