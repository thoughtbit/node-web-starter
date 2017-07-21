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
import { GraphQLEmail, GraphQLURL, GraphQLDateTime, GraphQLUUID, GraphQLJSON } from '../scalars'
import { UserType } from '../user'
import TagType from '../tag/tagType'

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  description: 'A blog post or article',
  fields: () => ({
    id: {
      type: GraphQLUUID,
      description: 'The identifier for the article',
    },
    title: {
      type: GraphQLString,
      description: 'The title of the article',
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The slug / normalized article title.',
    },
    content: {
      type: GraphQLString,
      description: 'html content of the article',
    },
    published: {
      type: GraphQLBoolean,
      description: 'True if the article is published',
    },
    userId: {
      type: GraphQLUUID,
      description: 'True if the article is published',
    },
    // createdAt: {
    //   type: GraphQLDateTime,
    //   description: 'The timestamp when the article was created',
    // },
    // updatedAt: {
    //   type: GraphQLDateTime,
    //   description: 'The timestamp when the article was last updated',
    // },
    // deletedAt: {
    //   type: GraphQLDateTime,
    //   description: 'The timestamp when the article was deleted',
    // },
    tags: {
      type: new GraphQLList(TagType),
      description: 'Tags relating articles together',
    },
    author: {
      type: UserType,
      description: 'Users belonging to a role.',
    },
  }),
})

export const CreateArticleInput = new GraphQLInputObjectType({
  name: 'CreateArticleInput',
  fields: () => ({
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the article',
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The slug / normalized article title.',
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'html content of the article',
    },
    published: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'True if the article is published',
    },
    tags: {
      type: GraphQLString,
      description: 'Tags relating articles together',
    },
  }),
})
export const EditArticleInput = new GraphQLInputObjectType({
  name: 'EditArticleInput',
  fields: () => ({
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the article',
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The slug / normalized article title.',
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'html content of the article',
    },
    published: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'True if the article is published',
    },
  }),
})
export default ArticleType
