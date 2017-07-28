const path = require('path')

module.exports = {
  client: 'pg', // 'mysql'
  connection: 'postgres://postgres@127.0.0.1:5432/bear', // 'mysql://root:123456@127.0.0.1:3306/bear',
  searchPath: 'knex,public',
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'migrations',
    directory: path.resolve(process.cwd(), '.bear/db/migrations'),
  },
  seeds: {
    directory: path.resolve(process.cwd(), '.bear/db/seeds'),
  },
  debug: true,
}
