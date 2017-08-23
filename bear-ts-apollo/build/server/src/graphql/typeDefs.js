"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const gql_merge_1 = require("gql-merge");
const _debug = require("debug");
const debug = _debug('bear:graph:typeDefs');
/**
 * Plugin support requires us to merge the type definitions from the loaded
 * graphql tags, this gives us the ability to extend any portion of the
 * available graph.
 */
const typeDefs = gql_merge_1.mergeStrings([
    // Load the core graph definitions from the filesystem.
    fs_1.readFileSync(path_1.join(__dirname, 'typeDefs.graphql'), 'utf8')
]);
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map