import path from 'path'

export default {
  version: '1.1.0',
  // 根目录
  root: path.resolve(__dirname, '../../../'),
  api: {
    port: {
      format: 'port',
      default: 3000,
    },
    protocol: {
      format: String,
      default: 'http',
    },
    host: {
      format: 'ipaddress',
      default: '0.0.0.0',
    },
    prefix: {
      format: String,
      default: '/api/v1',
      doc: 'The prefix for api routes and then the versioning',
    },
  },
  server: {
    port: 9090,
    host: '127.0.0.1',
    apiPrefix: '/api/v1',
    siteUrl: 'http://localhost:3000',
  },
  logging: {
    level: 'debug',
    file: {
      enable: true,
      dir: 'logs',
      level: 'info',
      filename: 'bear.io',
    },
  },
  // 数据库
  db: {
    url: 'mysql://root:123456@127.0.0.1:3306/bear', // url: 'postgres://postgres@127.0.0.1:5432/bear',
    name: 'bear',
    debug: false,
  },
  // // MongoDB settings
  mongodb: {
    url: 'mongodb://127.0.0.1:27017',
    options: { user: '', pass: '' },
  },
  redis: {
    url: 'redis://127.0.0.1:6379',
    isAvailable: false,
    host: '127.0.0.1',
    port: 6379,
    auth: '',
    options: {},
  },
  token: {
    secret: 'b0ldrk3kwi11s15',
  },
  mail: {
    host: 'smtp.example',
    port: 465,
    ssl: true,
    user: 'hello@site.com',
    password: 'password',
    from: 'hello@site.com',
  },
  cors: {
    whitelist: ['http://localhost:2121', 'http://localhost:3000'],
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
