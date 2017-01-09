import db from './helpers/db/mysql'

const force = process.argv.slice(2).includes('--force')
async function createTables() {
  try {
    await db.sequelize.sync({ force })
  } catch (err) {
    console.log(err)
  }
}
createTables()

