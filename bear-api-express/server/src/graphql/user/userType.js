import {
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
} from 'graphql'
import { GraphQLEmail, GraphQLURL, GraphQLDateTime, GraphQLUUID, GraphQLJSON } from './../scalars'
import User from './../../models/user'
import ArticleType from './../article/articleType'
import RoleType from './../role/roleType'

export const SocialType = new GraphQLObjectType({
  name: 'Social',
  fields: () => ({
    id: {
      type: GraphQLUUID,
      description: 'The id',
    },
    userId: {
      type: GraphQLUUID,
      description: 'The unique identifier for the user for the identity.',
    },
    facebookUrl: {
      type: GraphQLURL,
      description: 'The facebook profile url for the user.',
    },
    googleUrl: {
      type: GraphQLURL,
      description: 'The facebook profile url for the user.',
    },
    githubUrl: {
      type: GraphQLURL,
      description: 'The facebook profile url for the user.',
    },
  }),
})

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'The user or account',
  fields: () => ({
    id: {
      type: GraphQLUUID,
      description: 'The users id (uuid)',
    },
    email: {
      type: new GraphQLNonNull(GraphQLEmail),
      description: 'The user email',
    },
    username: {
      type: GraphQLString,
      description: 'The username of the user',
    },
    verified: {
      type: GraphQLBoolean,
      description: 'true if email is verified, false otherwise',
    },
    avatarUrl: {
      type: GraphQLURL,
      description: "url of user's avatar picture",
    },
    roles: {
      type: new GraphQLList(RoleType),
      description: 'Roles the user belongs to.',
      resolve(user, args, ctx) {
        return User.query().findById(user.id).then(result => result.$relatedQuery('roles'))
      },
    },
    socialMedia: {
      type: SocialType,
      description: 'Social media profiles of the user.',
      resolve(user, args, ctx) {
        return User.query().findById(user.id).then(result => result.$relatedQuery('socialMedia'))
      },
    },
    articles: {
      type: new GraphQLList(ArticleType),
      description: 'Articles the user has written',
      resolve(user, args, ctx) {
        return User.query().findById(user.id).then(result => result.$relatedQuery('articles'))
      },
    },
    // deletedAt: {
    //   type: GraphQLDateTime,
    //   description: 'The timestamp when the user was deleted',
    // },
    // updatedAt: {
    //   type: GraphQLDateTime,
    //   description: 'The timestamp when the user was last updated',
    // },
    // createdAt: {
    //   type: GraphQLDateTime,
    //   description: 'The timestamp when the user was created',
    // },
  }),
})

export const EditUserInput = new GraphQLInputObjectType({
  name: 'EditUserInput',
  fields: () => ({
    email: {
      type: new GraphQLNonNull(GraphQLEmail),
      description: 'The email address of the account to login to.',
    },
    username: {
      type: GraphQLString,
      description: 'The username for the new user',
    },
  }),
})

export default UserType
