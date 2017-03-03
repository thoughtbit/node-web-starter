// import user from './user'

// export default {
//   ...user,
// }

import { GraphQLString } from 'graphql'
import gitHubUser from './facets/gitHubUser'

export default {
  hello: {
    type: GraphQLString,
    // Resolve function can return -
    // A value, a promise, or an array of promises
    resolve() {
      return 'Hello World'
    },
  },
  gitHubUser,
}

/*
{
  hello
}

{
  gitHubUser(username:"moocss") {
    id,
      following_url,
      usersFollowing {
      id,
        html_url,
        following_url
    }
  }
}
*/
