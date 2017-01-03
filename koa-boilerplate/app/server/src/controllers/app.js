async function home(ctx, next) {
  await ctx.render('index', {
    name: 'fuxin',
  })
}

async function about(ctx, next) {
  await ctx.render('about', {
    name: 'about',
  })
}

async function search(ctx, next) {
  // const uri = ctx.request.body.uri
  // const result = await lib.relend(uri)
  // if (result.status === 400) {
  //   throw new ctx.err({ message: '用户已存在', status: 400 })
  // }
  // ctx.body = result
  // ctx.body = '续借成功'
}

export default {
  home,
  about,
}
