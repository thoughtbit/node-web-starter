import { Router } from 'express'
import { isAuthenticated } from './../../services/authentication'
import { checkRole } from './../../middleware/rbac'
import Article from './../../models/article'
import * as ctrl from './article.controller'


const router = new Router()

router.post(isAuthenticated, checkRole('Admin'), ctrl.createArticle)

router
  .route('/slug/:slug')
  .get(ctrl.getSlug)

router.get('/archived', isAuthenticated, checkRole('Admin'), ctrl.getArticlesWithArchive)

router
  .route('/:id')
  .get(ctrl.getId)
  .post(isAuthenticated, checkRole('Admin'), ctrl.addTag)
  .put(isAuthenticated, checkRole('Admin'), ctrl.update)
  .delete(isAuthenticated, checkRole('Admin'), ctrl.destroy)


router.get('/:id/relate/:mediaId', ctrl.relateArticleToMedia)

router.delete('/:id/remove', ctrl.permanentlyDeleteArticle)

router.get('/:id/relate/:mediaId', isAuthenticated, checkRole('Admin'), ctrl.relateMediaToArticle)

export default router
