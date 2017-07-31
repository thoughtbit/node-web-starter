import BaseModel, { mergeSchemas } from './base'

import Tag from './tag'
import User from './user'

class Article extends BaseModel {
  static tableName = 'article'

  static addTimestamps = true

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['title', 'slug', 'content', 'published', 'userId'],
    properties: {
      id: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
      title: { type: 'string' },
      slug: { type: 'string' },
      excerpt: { type: 'string' },
      content: {
        type: 'string',
      },
      published: { type: 'boolean' },
      userId: { type: 'string' },
      createdAt: { type: 'date-time' },
      updatedAt: { type: 'date-time' },
      deletedAt: { type: 'date-time' },
    },
  })

  static get relationMappings() {
    return {
      author: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'article.userId',
          to: 'user.id',
        },
      },
      tags: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Tag,
        join: {
          from: 'article.id',
          through: {
            from: 'article_tag.articleId',
            to: 'article_tag.tagId',
          },
          to: 'tag.id',
        },
      },
    }
  }

  static getOnlyArticles(offset, limit) {
    return Article.query().offset(offset).limit(limit)
  }
  static getArticles(offset, limit) {
    return Article.query().offset(offset).limit(limit).eager('[author,tags]')
  }
  static getArticlesByTag(name, offset, limit) {
    return Tag.query().where({ name }).then(([tag]) => tag.$relatedQuery('articles').offset(offset).limit(limit))
  }
  static getArticlesByUserId(userId) {
    return Article.query().where({ userId })
  }
  static getArticleById(id) {
    return Article.query().where({ id }).then(x => x[0])
  }

  static getArticleBySlug(slug) {
    return Article.query().where({ slug }).eager('[tags,author]').then(x => x[0])
  }
}

export default Article
