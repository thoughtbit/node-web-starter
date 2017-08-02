"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const routes_1 = require("./routes");
const api_1 = require("./api");
const middleware_1 = require("./middleware");
const promiseRouter = require('express-promise-router');
const app = express();
const router = promiseRouter();
// Base Express middleware - body-parser, method-override, busboy, cors
middleware_1.expressMiddleware(app);
// Session middleware, authentication check, rbac
// authMiddleware(app)
// All routes for the app
routes_1.default(app);
// Register our REST API.
api_1.default(router);
// Setup the public directory so that we can serve static assets.
// app.use(express.static(path.resolve(__dirname, '../../public')))
exports.default = app;
//# sourceMappingURL=app.js.map