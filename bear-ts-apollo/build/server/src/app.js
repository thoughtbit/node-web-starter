"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const routes_1 = require("./routes");
const middleware_1 = require("./middleware");
const router = express.Router();
const server = express();
// Base Express middleware - body-parser, method-override, busboy, cors
middleware_1.expressMiddleware(server);
// All routes for the server
routes_1.default(server);
// Setup the public directory so that we can serve static assets.
server.use(express.static(path.resolve(__dirname, '../../public')));
exports.default = server;
//# sourceMappingURL=app.js.map