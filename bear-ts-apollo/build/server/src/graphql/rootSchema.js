"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const graphql_errors_1 = require("graphql-errors");
const plugins = require('../services/plugins');
const typeDefs_1 = require("./typeDefs");
const RootSchema = graphql_tools_1.makeExecutableSchema({
    typeDefs: typeDefs_1.default,
    resolver
});
// If we are in production mode, don't show server errors to the front end.
if (process.env.NODE_ENV === 'production') {
    // Mask errors that are thrown if we are in a production environment.
    graphql_errors_1.maskErrors(RootSchema);
}
exports.default = RootSchema;
//# sourceMappingURL=rootSchema.js.map