import db from './db/mysql'

export default (callback) => {
  callback(db)
}
