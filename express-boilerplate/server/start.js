const env = process.env.NODE_ENV || 'development'
const src = env === 'production' ? './build/server' : './src/server'

require('babel-polyfill')
if (env === 'development') {
  require('babel-register')
}

require(src).default
