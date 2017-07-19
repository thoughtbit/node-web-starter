import  { Response, Request } from 'express';
import { Unauthorized } from '../../core/errors/clientError';

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 * @returns {Function} - express middleware
 */
function isAuthenticated(req, res) {
  // $FlowIssue
  if (req.isAuthenticated()) {
    next();
  } else {
    return next(new Unauthorized());
  }
}

export default isAuthenticated;
