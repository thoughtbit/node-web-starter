import * as path from 'path';
import * as Knex from 'knex';
import { Model } from 'objection';
import config from './../../config';

function resolveOwn(relativePath) {
  return path.resolve(__dirname, relativePath);
}

const dbConfig = {
  client: 'pg',
  connection: config.db.url,
  searchPath: 'knex,public',
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'migrations'
  },
  debug: config.db.debug
};

const knexOpts = Object.assign(dbConfig, config.db);

const db = Knex(knexOpts);

function initializeDb() {
  // const dir = resolveOwn('../../models')
  Model.knex(db);
  // Model.setBasePath(dir)
  // Model.pickJsonSchemaProperties = false
  return db.raw('select 1+1 as result');
}

async function disconnect() {
  if (!db) {
    return;
  }
  try {
    await db.destroy();
  } catch (err) {
    throw new Error(err);
  }
}

export default db;
export { disconnect, initializeDb };
