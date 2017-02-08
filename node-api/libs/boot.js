import https from "https";
import fs from "fs";

export default (app) => {
  if (process.env.NODE_ENV !== "test") {
    const credentials = {
      key: fs.readFileSync("app.key", "utf8"),
      cert: fs.readFileSync("app.cert", "utf8")
    }
    app.db.sequelize.sync().done(() => {
      https.createServer(credentials, app)
        .listen(app.get("port"), () => {
          console.log(`Node API - Port ${app.get("port")}`)
        })
    })
  }
}
