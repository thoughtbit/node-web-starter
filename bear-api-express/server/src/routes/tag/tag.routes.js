import { Router } from 'express'
import { isAuthenticated } from '../../services/authentication'
import * as ctrl from './tag.controller'

const router = wrapRouter(new Router())

router.get('/', ctrl.listTags)

router.get('/:id', ctrl.getTag)

router.get('/:name/articles', ctrl.getTaggedArticlesByName)

router.get('/articles/:id', ctrl.getTaggedArticles)

router.post('/', isAuthenticated, ctrl.createTag)

router.put('/:id', isAuthenticated, ctrl.updateTag)

router.patch('/:id', isAuthenticated, ctrl.updateTag)

router.delete('/:id', isAuthenticated, ctrl.deleteTag)

router.get('/:id/relate/:articleid', ctrl.relateTagToArticle)

export default router
