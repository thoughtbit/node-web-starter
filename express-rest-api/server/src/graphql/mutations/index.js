// import user from './user'

// export default {
//   ...user,
// }

import { GraphQLString } from 'graphql'

export default {
  hello: {
    type: GraphQLString,
    // Resolve function can return -
    // A value, a promise, or an array of promises
    resolve() {
      return 'Hello World Mutated'
    },
  },
}
