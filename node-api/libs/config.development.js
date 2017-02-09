module.exports = {
  db: {
    name: 'darwin',
    username: 'root',
    password: '',
    options: {
      host: 'localhost',
      port: 3306,
      dialect: 'mysql',
    },
    encode: {
      set: 'utf8',
      collation: 'utf8_general_ci',
    },
    pool: {
      min: 2,
      max: 10,
      /** 单位毫秒 */
      idle: 300 * 1000,
    },
  },
  jwtSecret: "Node-AP1",
  jwtSession: {session: false}
}
