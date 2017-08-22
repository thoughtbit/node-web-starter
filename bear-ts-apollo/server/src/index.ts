import * as http from 'http';
import * as express from 'express';
import * as _debug from 'debug';

import { setupParentApp } from './app';
import { initializeDb, disconnect } from './helpers/db/postgres';
import config from './config';

const debug = _debug('bear:app');

const PORT = config.server.port;
const HOST = config.server.host;

let parentApp;
let server;

export default function start() {
  debug('initializing server creation procedure...');
  // connect to db
  initializeDb()
    .then(() => {
      console.log('Database connected successfully');
      parentApp = setupParentApp();
      server = http.createServer(parentApp);
      server.listen(PORT, HOST);
      server.on('listening', () => {
        const address = server.address();
        console.log(
          '🚀  Starting server on %s:%s',
          address.address,
          address.port
        );
      });
      server.on('error', (err) => {
        console.log(`⚠️  ${err}`);
        throw err;
      });
    });
}

process.on('SIGINT', () => {
  console.log('shutting down!');
  disconnect(); // 关闭数据库
  server.close();
  process.exit();
});

process.on('uncaughtException', (error) => {
  console.log(`uncaughtException: ${error.message}`);
  console.log(error.stack);
  debug(error.stack);
  process.exit(1);
});
