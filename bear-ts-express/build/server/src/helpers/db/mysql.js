"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path = require("path");
const Knex = require("knex");
const objection_1 = require("objection");
const config_1 = require("./../../config");
function resolveOwn(relativePath) {
    return path.resolve(__dirname, relativePath);
}
const dbConfig = {
    client: 'mysql',
    connection: config_1.default.db.url,
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'migrations'
    },
    debug: config_1.default.db.debug
};
const knexOpts = Object.assign(dbConfig, config_1.default.db);
const db = Knex(knexOpts);
function initializeDb() {
    // const dir = resolveOwn('../../models')
    objection_1.Model.knex(db);
    // Model.setBasePath(dir)
    // Model.pickJsonSchemaProperties = false
    return db.raw('select 1+1 as result');
}
exports.initializeDb = initializeDb;
function disconnect() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!db) {
            return;
        }
        try {
            yield db.destroy();
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.disconnect = disconnect;
exports.default = db;
//# sourceMappingURL=mysql.js.map