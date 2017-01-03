import path from 'path'

export default {
  // 端口
  port: process.env.PORT || 5000,
  // 根目录
  root: path.resolve(__dirname, '../../../../'),
  favicon: path.join(__dirname, '../public/favicon.png'),
  static: [
    {
      url: '/public',
      path: path.join(__dirname, '../public'),
    },
    {
      url: '/assets',
      path: path.join(__dirname, '../assets'),
    },
    {
      url: '/static',
      path: path.join(__dirname, '../docs'),
    },
  ],
  // 数据库
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
}
