import {
  GraphQLID,
  GraphQLNonNull,
} from 'graphql'

import blogPostType from '../../types/blog-post'
import getProjection from '../../get-projection'
import BlogPostModel from '../../../models/blog-post'

export default {
  type: blogPostType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(root, params, ctx, options) {
    const projection = getProjection(options.fieldASTs[0])

    return BlogPostModel
      .findById(params.id)
      .select(projection)
      .exec()
  },
}
