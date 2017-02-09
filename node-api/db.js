import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'

function resolveOwn(relativePath) {
  return path.resolve(__dirname, relativePath)
}

let db = null

module.exports = app => {

  if (!db) {
    const basename = path.basename(module.filename)
    const config = app.libs.config
    const logger = app.libs.logger

    const sequelize = new Sequelize(
      config.db.name,
      config.db.username,
      config.db.password,
      {
        ...config.db.options,
        define: {
          underscored: true,
        },
      }
    )

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

    const dir = resolveOwn('./models')

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
  }

  return db
}
