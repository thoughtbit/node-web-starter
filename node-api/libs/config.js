export default (app) => {
  const env = process.env.NODE_ENV
  if (env) {
    return require(`./config.${env}`)
  }
  return require("./config.dev")
}
