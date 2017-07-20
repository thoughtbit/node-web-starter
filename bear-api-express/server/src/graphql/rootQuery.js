import { GraphQLObjectType } from 'graphql'
import settings from './setting/settingQuery'
import user from './user/userQuery'

const rootFields = Object.assign(
  {},
  settings,
  user,
)

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => rootFields,
})

export default RootQueryType
