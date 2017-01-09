import base from './env/base'

const env = process.env.NODE_ENV || 'development'
const config = require(`./env/${env}`).default

export default Object.assign({}, base, config)
