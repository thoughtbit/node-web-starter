import * as http from 'http';
import * as _debug from 'debug';
import app from './app';
import { initializeDb, disconnect } from './helpers/db/postgres';
import config from './config';

const debug = _debug('bear:app');

const PORT = config.server.port;
const HOST = config.server.host;

const server = http.createServer(app);

// connect to db
initializeDb()
  .then(() => {
    console.log('Database connected successfully');
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
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

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
