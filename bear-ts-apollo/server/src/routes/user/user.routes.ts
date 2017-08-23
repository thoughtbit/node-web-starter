import * as express from 'express';
import * as ctrl from './user.controller';

let router = express.Router();

router.get('/', (req, res, next) => {
  if (req.session.views) {
    req.session.views++;
    res.send('第 ' + req.session.views + ' 次访问');
  } else {
    req.session.views = 1;
    res.send('欢迎您，请刷新试试');
  }
});

router.get('/home', function (req, res, next) {
  console.log(req.session.id);
  if (req.session.token) {
    res.send({
      success: true,
      message: 'Enjoy your token!',
      token: req.session.token
    });
  } else {
    res.send('授权过期重新登录');
  }
});

router.post('/login', function (req, res) {
  req.session.token = 'token_' + redomToken();
  console.log(req.session.token);
  res.send({
    success: true,
    message: '登录成功！!',
    token: req.session.token
  });
});

router.post('/signout', function (req, res) {
  req.session.token = null;
  res.send({
    success: true,
    message: '退出登录！'
  });
});

router.get('/:id', ctrl.getUser);
router.get('/:username/profile', ctrl.getUsername);

function redomToken() {
  let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
  let maxpos = chars.length;
  let str = '';
  for (let i = 0; i < 32; i++) {
    str += chars.charAt(Math.floor(Math.random() * maxpos));
  }
  return str;
}

export default router;
