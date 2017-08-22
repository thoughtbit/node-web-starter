import { makeExecutableSchema } from 'graphql-tools';
import { maskErrors } from 'graphql-errors';
import { decorateWithHooks } from './hooks';

const plugins = require('../services/plugins');
import resolvers from './rooRresolver';
import typeDefs from './typeDefs';

const RootSchema = makeExecutableSchema({
  typeDefs,
  resolver
});

// If we are in production mode, don't show server errors to the front end.
if (process.env.NODE_ENV === 'production') {

  // Mask errors that are thrown if we are in a production environment.
  maskErrors(RootSchema);
}
export default RootSchema;
