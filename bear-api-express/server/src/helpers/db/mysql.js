import path from 'path'
import knex from 'knex'
import { Model } from 'objection'
import config from './../../config'

function resolveOwn(relativePath) {
  return path.resolve(__dirname, relativePath)
}

const dbConfig = {
  client: 'mysql',
  connection: config.db.url,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'migrations',
  },
  debug: config.db.debug,
}

const knexOpts = Object.assign(dbConfig, config.db)

const db = knex(knexOpts)

function initializeDb() {
  // const dir = resolveOwn('../../models')
  Model.knex(db)
  // Model.setBasePath(dir)
  // Model.pickJsonSchemaProperties = false
  return db.raw('select 1+1 as result')
}

/*
function initializeDb(callback) {
  // const dir = resolveOwn('../../models')
  Model.knex(db)
  // Model.setBasePath(dir);
  // Model.pickJsonSchemaProperties = false;
  return callback(db.raw('select 1+1 as result'))
}
*/

async function disconnect(db) {
  if (!db) {
    return
  }
  try {
    await db.destroy()
  } catch (err) {
    throw new Error(err)
  }
}

export default db
export { disconnect, initializeDb }
