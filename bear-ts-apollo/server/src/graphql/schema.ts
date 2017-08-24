import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { maskErrors } from 'graphql-errors';

import resolvers from './resolvers';
import typeDefs from './typeDefs';

const RootSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: { requireResolversForNonScalar: false },
  logger: console
});

// If we are in production mode, don't show server errors to the front end.
if (process.env.NODE_ENV === 'production') {

  // Mask errors that are thrown if we are in a production environment.
  maskErrors(RootSchema);
}
export default RootSchema;
