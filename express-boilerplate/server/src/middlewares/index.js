import expressMiddleware from './express';
import authMiddleware from './auth';
import rbac from './rbac';
import errorHandler from './errorHandler';
import sessionMiddleware from './session';

export {
  expressMiddleware,
  authMiddleware,
  rbac,
  errorHandler,
  sessionMiddleware,
}

// import { Router } from 'express'
// const routes = new Router()
// export default ({ config, db }) => {
// 	// add middleware here
//   return routes
// }
