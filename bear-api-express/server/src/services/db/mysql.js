import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import logger from '../logger'
import config from '../../config'

function resolveOwn(relativePath) {
  return path.resolve(__dirname, relativePath)
}

let db = {}

const defaultConfig = {
  host: "localhost",
  port: 3306,
  username: "root",
  benchmark: true,
  define: {
    freezeTableName: false,
    underscored: true
  }
};
const config = Object.assign(defaultConfig, config.sequelize);

const basename = path.basename(module.filename);

const sequelize = new Sequelize(
  config.db.mysql.database,
  config.db.mysql.username,
  config.db.mysql.password,
  {
    ...config.db.mysql.options
  }
);

// 测试连接
sequelize.authenticate()
  .then((err) => {
    logger.debug('DB: Connected', err)
  })
  .catch((err) => {
    logger.debug('DB: Not Connected', err)
  })

db = {
  sequelize,
  Sequelize,
  execute: ::sequelize.transaction,
  models: {},
}

const dir = resolveOwn('../../models')

fs.readdirSync(dir)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename))
  .forEach((file) => {
    const modelDir = path.join(dir, file)
    const model = sequelize.import(modelDir)
    db.models[model.name] = model
  })

Object.keys(db.models).forEach((key) => {
  if ('associate' in db.models[key]) {
    db.models[key].associate(db.models)
  }
})

const initializeDb = (callback) => callback(db)

export default db
export { initializeDb }
