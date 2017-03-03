import {
  GraphQLList,
} from 'graphql'
import axios from 'axios'
import RepoInfoType from './../../types/facets/RepoInfoType'

const following = {
  type: new GraphQLList(RepoInfoType),
  description: 'Fields about the people you this person follows',
  resolve(obj) {
    const brackIndex = obj.following_url.indexOf('{')
    const url = obj.following_url.slice(0, brackIndex)

    return axios.get(url)
      .then(response => response.data)
  },
}

export default following
