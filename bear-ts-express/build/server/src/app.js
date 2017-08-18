"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const _debug = require("debug");
const routes_1 = require("./routes");
const middleware_1 = require("./middleware");
const debug = _debug('bear:server');
const server = express();
// ==============================================================================
// 中间件
// ==============================================================================
// Base Express middleware - body-parser, method-override, busboy, cors
middleware_1.expressMiddleware(server);
debug(`mounting routes ...`);
// ==============================================================================
// ROUTES
// ==============================================================================
// All routes for the server
routes_1.default(server);
exports.default = server;
//# sourceMappingURL=app.js.map