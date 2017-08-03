"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const routes_1 = require("./routes");
const api_1 = require("./api");
const middleware_1 = require("./middleware");
const router = express.Router();
const app = express();
// Base Express middleware - body-parser, method-override, busboy, cors
middleware_1.expressMiddleware(app);
// All routes for the app
routes_1.default(app);
// Register our REST API.
api_1.default(router);
app.use(bodyParser.json());
// app.use(router)
// Setup the public directory so that we can serve static assets.
app.use(express.static(path.resolve(__dirname, '../../public')));
exports.default = app;
//# sourceMappingURL=app.js.map