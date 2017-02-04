import path from 'path'

export default {
  version: '1.1.0',
  // 端口
  port: process.env.PORT || 9090,
  // 根目录
  root: path.resolve(__dirname, '../../../'),
  // 数据库
  db: {
    mysql: {
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
    // // MongoDB settings
    // mongodb: {
    //   dbURI: `mongodb://${process.env.MONGO_HOST || process.env.EXPRESSRESTAPIES6_MONGO_1_PORT_27017_TCP_ADDR || 'localhost'}:27017/${process.env.MONGO_DB_NAME || 'db-name'}`,
    //   dbOptions: { user: '', pass: '' },
    // },
    redis: {
      isAvailable: process.env.IS_REDIS_AVAILABLE || false,
      host: process.env.APP_REDIS_HOST || process.env.EXPRESSRESTAPIES6_REDIS_1_PORT_6379_TCP_ADDR || '127.0.0.1',
      port: process.env.APP_REDIS_PORT || process.env.EXPRESSRESTAPIES6_REDIS_1_PORT_6379_TCP_PORT || 6379,
      auth: process.env.REDIS_AUTH || '',
      options: {},
    },
  },
  // 上传配置
  upload: {
    /** 是否允许直接解压zip包 */
    allowUnzip: false,
    /** 文件存储路径 */
    dir: '/data/upload',
    /** 解压缩包文件最多限制 */
    unzipMaxFileNum: 100,
    /**
     * 不允许的后缀，包括压缩包里的，如果要求解压的时候也要判断
     * 一旦有不和发的直接报错
     */
    blackList: ['.php'],
    /** 文件下载路径 */
    accessUrl: './access-files',
  },
  bodyLimit: '100kb',
  corsHeaders: ['Link'],
}
