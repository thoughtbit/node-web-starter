import { readFileSync } from 'fs';
import { join } from 'path';
import { mergeStrings } from 'gql-merge';
import * as _debug from 'debug';

const debug = _debug('bear:graph:typeDefs');

/**
 * Plugin support requires us to merge the type definitions from the loaded
 * graphql tags, this gives us the ability to extend any portion of the
 * available graph.
 */
const typeDefs = mergeStrings([
  // Load the core graph definitions from the filesystem.
  readFileSync(join(__dirname, 'typeDefs.graphql'), 'utf8')
]);

export default typeDefs;
