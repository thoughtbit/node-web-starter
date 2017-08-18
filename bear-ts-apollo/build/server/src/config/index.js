"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./env/base");
const env = process.env.NODE_ENV || 'development';
const config = require(`./env/${env}`).default;
exports.default = Object.assign({}, base_1.default, config);
//# sourceMappingURL=index.js.map