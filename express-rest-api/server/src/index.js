import server from 'server'
import initializeDb from './helpers/mysql'
import config from './config'
import pkg from  '../package.json'

const banner = `
*********************************************************************************************
*
* ${pkg.description}
* @version ${pkg.version}
* @author ${pkg.author.name}
*
*********************************************************************************************`;

// express
const startServer = ({ config, db }) => {

    console.log(banner);

    // Initialize server
    const app = server.init({ config, db })

    // Start up the server on the port specified in the config after we connected to mongodb
    app.listen(config.server.port, () => {
        console.log(`App started on port ${config.server.port} with environment ${config.environment}`);
    })
}

// connect to db
initializeDb(db => {
  startServer({ config, db })
})

export default app
