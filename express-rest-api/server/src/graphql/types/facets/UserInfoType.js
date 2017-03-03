import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql'
import usersFollowing from './../../queries/facets/userFollowing'

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

const UserInfoType = new GraphQLObjectType({
  name: 'UserInfo',
  description: 'Basic information of a GitHub user',
  fields: {
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
    name: { type: GraphQLString },
    company: { type: GraphQLString },
    blog: { type: GraphQLString },
    location: { type: GraphQLString },
    email: { type: GraphQLString },
    hireable: { type: GraphQLBoolean },
    bio: { type: GraphQLString },
    public_repos: { type: GraphQLInt },
    public_gists: { type: GraphQLInt },
    followers: { type: GraphQLInt },
    following: { type: GraphQLInt },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    usersFollowing,
  },
})

export default UserInfoType
