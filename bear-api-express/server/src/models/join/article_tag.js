import BaseModel from './../base'
import Tag from './../tag'
import Article from './../article'

class ArticleTag extends BaseModel {
  static tableName = 'article_tag'

  static addTimestamps = true

  static get idColumn() {
    return ['articleId', 'tagId']
  }

  static get relationMappings() {
    return {
      tag: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Tag,
        join: {
          from: 'article_tag.tagId',
          to: 'tag.id',
        },
      },
      article: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Article,
        join: {
          from: 'article_tag.articleId',
          to: 'article.id',
        },
      },
    }
  }
}

export default ArticleTag
