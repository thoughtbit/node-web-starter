project/
  controllers/
    comments.js
    index.js
    users.js
  helpers/
    dates.js
  middlewares/
    auth.js
    users.js
  models/
    comment.js
    user.js
  public/
    libs/
    css/
    img/
  views/
    comments/
      comment.jade
    users/
    index.jade
  tests/
    controllers/
    models/
      comment.js
    middlewares/
    integration/
    ui/
  .gitignore
  app.js
  package.json


controllers/ – 定义你应用的路由和它们的逻辑
helpers/ – 可以被应用的其他部分所共享的代码和功能
middlewares/ – 处理请求的Express中间件
models/ – 代表了实现了业务逻辑的数据
public/ – 包含了如图片，样式，javascript这样的静态文件
views/ – 提供了供路由渲染的页面模板
tests/ – 用于测试其他文件夹的代码
app.js – 初始化你的应用，并将所以部分联接在一起
package.json – 记录你的应用的依赖库以及它们的版本