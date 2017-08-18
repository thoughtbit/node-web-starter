import * as express from 'express';
import * as ctrl from './user.controller';

let router = express.Router();

router.get('/', function (req, res, next) {
  res.send('Hello World!');
});

router.get('/:id', ctrl.getUser);
router.get('/:username/profile', ctrl.getUsername);

export default router;
