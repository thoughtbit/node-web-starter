import uuid from 'uuid/v4'
import _debug from 'debug'
import { responseHandler, Conflict, BadRequest } from './../../core'
import slugIt from './../../helpers/utils/sluglt'
import Tag from '../../models/tag'
import User from '../../models/user'
import Article from '../../models/article'
import ArticleTag from './../../models/join/article_tag'

const debug = _debug('bear:server:article-ctrl')

export async function createArticle(req, res, next) {
  req.assert('title', 'A title is required to create a post.').notEmpty()
  req.assert('content', 'Content is required when creating a post.').notEmpty()
  req.assert('tags', 'A new post requires at least one tag.').notEmpty()
  req.sanitize('title').trim()

  const errors = req.validationErrors()

  if (errors) {
    return res.status(400).send(errors)
  }
  const articleSlug = slugIt(req.body.title)
  // look for a matching slug in the database
  const existingArticle = await Article.query().where('slug', articleSlug).first()
  if (existingArticle) {
    return res.status(409).json('A post with this title already exists.')
  }

  async function createArticleTagRelation(existingTag, newArticle) {
    try {
      await ArticleTag.query().insert({
        tagId: existingTag.id,
        articleId: newArticle.id,
      })
    } catch (error) {
      debug(error)
    }
  }

  try {
    // create the post
    const createArticle = await Article.query().insert({
      title: req.body.title,
      slug: articleSlug,
      excerpt: req.body.excerpt,
      content: req.body.content,
      published: req.body.published,
      userId: req.user.id,
    })

    const reqTags = req.body.tags

    reqTags.map(async (tag) => {
      debug(tag)
      const existingTag = await Tag.query().where('name', tag).first().skipUndefined()
      if (existingTag) {
        debug('existingTag', existingTag)
        await createArticleTagRelation(existingTag, newArticle)
      } else {
        debug('tag', tag)
        await createArticle.$relatedQuery('tags').insert({ name: tag }).skipUndefined()
      }
    })
    const relatedFeatureImg = await Media.query()
      .where('url', req.body.featureImage)
      .first()
      .skipUndefined()
    await ArticleMedia.query()
      .insert({
        mediaId: relatedFeatureImg.id,
        articleId: createArticle.id,
      })
      .skipUndefined()
    return responseHandler(res, 201, createArticle)
  } catch (error) {
    next(error)
  }
}

export async function relateMediaToArticle(req, res, next) {
  try {
    const article = await Article.query().findById(req.params.id)
    const newRelation = await article.$relatedQuery('media').relate({ id: req.params.mediaId })
    return res.status(200).json(newRelation)
  } catch (error) {
    return next(error)
  }
}

export async function getSlug(req, res, next) {
  try {
    const article = await Article.query()
      .where({ slug: req.params.slug })
      .eager('[tags,author]')
      .omit(['password'])
      .skipUndefined()
      .first()

    if (!article) {
      return res.status(400).json({
        message: `Unable to find a post matching ${req.params.slug}.`,
      })
    }
    return responseHandler(res, 200, article)
  } catch (error) {
    return next(error)
  }
}

export async function getId(req, res, next) {
  try {
    const article = await Article.query()
      .findById(req.params.id)
      .eager('[tags,author]')
      .skipUndefined()
      .first()
    return responseHandler(res, 200, article)
  } catch (error) {
    return next(error)
  }
}

export async function destroy(req, res, next) {
  try {
    await Article.query().delete().where('id', req.params.id).first()

    return res.status(204).send({})
  } catch (error) {
    return next(error)
  }
}

export function update(req, res) {
  debug(req.body)
  return Article.query().patchAndFetchById(req.params.id, req.body).then((article) => {
    return responseHandler(res, 202, article)
  })
}

export async function addTag(req, res, next) {
  try {
    const article = await Article.query().findById(req.params.id)

    if (!article) {
      return res.status(404).json({
        message: `Unable to find an article with the ID: ${req.params.id}.`,
      })
    }

    const tag = await article.$relatedQuery('tags').insert(req.body)

    return responseHandler(res, 202, tag)
  } catch (error) {
    return next(error)
  }
}

export async function getArticlesWithArchive(req, res, next) {
  try {
    const articles = await Article.query()
      .eager('[author,tags,media]')
      .skipUndefined()
      .withArchived()

    return res.status(200).json(articles)
  } catch (err) {
    return next(err)
  }
}

export async function permanentlyDeleteArticle(req, res, next) {
  try {
    const article = await Article.query().forceDelete().where({ id: req.params.id })

    return res.status(204).json(article)
  } catch (err) {
    return next(err)
  }
}
