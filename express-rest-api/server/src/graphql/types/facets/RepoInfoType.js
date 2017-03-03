import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql'

function followingUrl() {
  return {
    type: GraphQLString,
    description: 'URI to get data on the people this person follows',
    resolve: (obj) => {
      const brackIndex = obj.following_url.indexOf('{')
      return obj.following_url.slice(0, brackIndex)
    },
  }
}

const RepoInfoType = new GraphQLObjectType({
  name: 'RepoInfo',
  description: 'Owner information on a repo',
  fields: () => ({
    login: { type: GraphQLString },
    id: { type: GraphQLInt },
    avatar_url: { type: GraphQLString },
    gravatar_id: { type: GraphQLString },
    url: { type: GraphQLString },
    html_url: { type: GraphQLString },
    followers_url: { type: GraphQLString },
    following_url: followingUrl(),
    gists_url: { type: GraphQLString },
    starred_url: { type: GraphQLString },
    subscriptions_url: { type: GraphQLString },
    organizations_url: { type: GraphQLString },
    repos_url: { type: GraphQLString },
    events_url: { type: GraphQLString },
    received_events_url: { type: GraphQLString },
    type: { type: GraphQLString },
    site_admin: { type: GraphQLBoolean },
  }),
})

export default RepoInfoType
