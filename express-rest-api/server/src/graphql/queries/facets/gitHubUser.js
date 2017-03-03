import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'
import axios from 'axios'
import UserInfoType from './../../types/facets/UserInfoType'

const user = {
  type: UserInfoType,
  description: 'GitHub user API data with enhanced and additional data',
  args: {
    username: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The GitHub user login you want information on',
    },
  },
  resolve(_, { username }) {
    const url = `https://api.github.com/users/${username}`
    return axios.get(url)
      .then(response => response.data)
  },
}

export default user
