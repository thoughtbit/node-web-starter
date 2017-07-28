const fs = require('fs')
const path = require('path')
const knex = require('knex')
const task = require('./task')

// The list of available commands, e.g. node scripts/db.js migrate:undo
const commands = ['version', 'migrate', 'migrate:undo', 'migration', 'seed', 'reset']
const command = process.argv[2]

const config = {
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

// The template for database migration files (see templates/*.js)
const version = new Date().toISOString().substr(0, 16).replace(/\D/g, '')
const template = `module.exports.up = async (db) => {\n  \n};\n
module.exports.down = async (db) => {\n  \n};\n
module.exports.configuration = { transaction: true };\n`

async function dropDatabase(db) {
  await db.schema.dropTableIfExists('article_tag')
  await db.schema.dropTableIfExists('user_role')
  await db.schema.dropTableIfExists('setting')
  await db.schema.dropTableIfExists('tag')
  await db.schema.dropTableIfExists('article')
  await db.schema.dropTableIfExists('social')
  await db.schema.dropTableIfExists('user')
  await db.schema.dropTableIfExists('role')
  await db.schema.dropTableIfExists('migrations')
  await db.migrate.latest(config)
  await db.seed.run(config)
}

module.exports = task('db', async () => {
  let db

  if (!commands.includes(command)) {
    throw new Error(`Unknown command: ${command}`)
  }

  try {
    switch (command) {
      case 'version':
        db = knex(config)
        await db.migrate.currentVersion(config).then(console.log)
        break
      case 'migration':
        fs.writeFileSync(`${process.cwd()}/.bear/db/migrations/${version}_${process.argv[3] || 'new'}.js`, template, 'utf8')
        break
      case 'migrate:undo':
        db = knex(config)
        await db.migrate.rollback(config)
        break
      case 'seed':
        db = knex(config)
        await db.seed.run(config)
        break
      case 'reset':
        db = knex(config)
        await dropDatabase(db)
        break
      default:
        db = knex(config)
        await db.migrate.latest(config)
    }
  } finally {
    if (db) {
      await db.destroy()
    }
  }
})
