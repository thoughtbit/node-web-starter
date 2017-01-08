/**
 * 路由入口
 */

import { Router } from 'express';

// Import all routes
import facets from './facets';
// import auth from './auth'
import api from './api/index'
import app from './app/index'

export default ({ config, db }) => {
	let router = Router();

	// mount the facets resource
	router.use('/facets', facets({ config, db }));

  // Protected resources
  //router.get('/users/me', auth, users.showMe)

	router.use('/api/admin', api.adminRouter({config, db}));
	router.use('/api/user', api.userRouter({config, db}));
	router.use('/app', app.userRouter);

	// perhaps expose some API metadata at the root
	router.get('/api', (req, res) => {
		res.json("api");
	});

	// perhaps expose some APP metadata at the root
	router.get('/app', (req, res) => {
		res.json("app");
	});

	// perhaps expose some router metadata at the root
	router.get('/', (req, res) => {
		res.json({ version });
	});

  // catch 404 and forward to error handler
  router.use(function(req, res, next) {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
  })

	return router;
}
