import { GraphQLObjectType } from 'graphql'
import setting from './setting/settingMutation'
import user from './user/userMutation'

const rootFields = Object.assign({}, setting, user)

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => rootFields,
})

export default RootMutationType
