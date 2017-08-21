"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const _debug = require("debug");
const routes_1 = require("./routes");
const middleware_1 = require("./middleware");
const debug = _debug('bear:server');
function setupParentApp() {
    debug('initalizing express parentApp...');
    let server = express();
    // ==============================================================================
    // 中间件
    // ==============================================================================
    // Base Express middleware - body-parser, method-override, busboy, cors
    middleware_1.expressMiddleware(server);
    // ==============================================================================
    // GRAPHIQL
    // ==============================================================================
    // server.use('/graphql', bodyParser.json(), graphqlExpress({
    //   schema
    // }));
    // server.use('/graphiql', graphiqlExpress({
    //   endpointURL: '/graphql'
    // }));
    // ==============================================================================
    // ROUTES
    // ==============================================================================
    // All routes for the server
    routes_1.default(server);
    debug('parentApp done');
    return server;
}
exports.setupParentApp = setupParentApp;
//# sourceMappingURL=app.js.map