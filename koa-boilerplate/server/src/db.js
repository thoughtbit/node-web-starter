import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import config from './config'

let db = {}

const basename = path.basename(module.filename)
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
  .then(() => {
    console.log('数据库连接成功！')
  })
  .catch((err) => {
    console.log('数据库连接失败，原因是:', err)
  })

db = {
  sequelize,
  Sequelize,
  execute: ::sequelize.transaction,
  models: {},
}

const dir = path.join(__dirname, 'models')

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

export default db
