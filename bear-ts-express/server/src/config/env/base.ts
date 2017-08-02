export default {
  server: {
    port: 9090,
    host: '127.0.0.1',
    apiPrefix: '/api/v1',
    siteUrl: 'http://localhost:3000',
  },
  // 数据库
  db: {
    url: 'postgres://postgres@127.0.0.1:5432/bear', // url: 'mysql://root:123456@127.0.0.1:3306/bear',
    name: 'bear',
    debug: false,
  }
}
