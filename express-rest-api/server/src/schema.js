import clone from 'lodash/clone'

import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql'

import mutations from './graphql/mutations'
import queries from './graphql/queries'

class SchemaManager {
  constructor() {
    this.init()
  }

  async init() {
    this.queryFields = clone(queries)
    this.mutationFields = clone(mutations)
    this.createRoot()
  }

  createRoot() {
    this.rootQuery = new GraphQLObjectType({
      name: 'Query',
      fields: () => (this.queryFields),
    })
    this.rootMutation = new GraphQLObjectType({
      name: 'Mutation',
      fields: () => (this.mutationFields),
    })
  }

  getSchema() {
    const schema = {
      query: this.rootQuery,
    }

    if (Object.keys(this.mutationFields).length) {
      schema.mutation = this.rootMutation
    }

    return new GraphQLSchema(schema)
  }
}

export default new SchemaManager()
