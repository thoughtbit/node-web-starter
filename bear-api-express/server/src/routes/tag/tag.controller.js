import _debug from 'debug'
import { responseHandler } from '../../core'
import Tag from './../../models/tag'

const debug = _debug('bear:tag-ctrl')

export async function listTags(req, res, next) {
  try {
    const includeQuery = req.query.include
    // if request query is include=posts
    if (includeQuery) {
      const allTags = await Tag.query().eager(`[${includeQuery}]`)
      return responseHandler(res, 200, allTags)
    }
    // or just return tags
    const allTags = await Tag.query()
    return responseHandler(res, 200, allTags)
  } catch (err) {
    return next(err)
  }
}

export async function getTag(req, res, next) {
  try {
    const aTag = await Tag.query().findById(req.params.id)
    return responseHandler(res, 200, aTag)
  } catch (err) {
    return next(err)
  }
}

export async function getTaggedArticles(req, res, next) {
  try {
    const tags = await Tag.query().findById(req.params.id).eager('articles')
    return responseHandler(res, 200, tags)
  } catch (error) {
    return next(error)
  }
}

export async function getTaggedArticlesByName(req, res, next) {
  try {
    const tags = await Tag.query()
      .where({ name: req.params.name })
      .eager('[articles]')
      .first()

    return responseHandler(res, 200, tags)
  } catch (error) {
    /* istanbul ignore next */
    return next(error)
  }
}

export async function createTag(req, res, next) {
  try {
    const newTag = await Tag.query().insert(req.body)

    return responseHandler(res, 201, newTag)
  } catch (error) {
    /* istanbul ignore next */
    return next(error)
  }
}

export function updateTag(req, res) {
  return Tag.query().patchAndFetchById(req.params.id, req.body).then((tag) => {
    responseHandler(res, 202, tag)
  })
}

export async function deleteTag(req, res, next) {
  try {
    // query for the requested tag
    const tag = await Tag.query().findById(req.params.id)
    // return a bad request if we cannot locate
    if (!tag) {
      /* istanbul ignore next */
      return res
        .status(400)
        .json('There was a problem with your request. Unable to find tag.')
    }
    // remove the attachment from the database
    await Tag.query().deleteById(req.params.id)
    // send a 204
    return res.status(204).json('Deleted')
  } catch (error) {
    /* istanbul ignore next */
    return next(error)
  }
}

export async function relateTagToArticle(req, res, next) {
  try {
    const tag = await Tag.query().findById(req.params.id)
    const newRelation = await tag
      .$relatedQuery('articles')
      .relate({ id: req.params.articleid })
    return res.status(200).json(newRelation)
  } catch (error) {
    /* istanbul ignore next */
    return next(error)
  }
}
