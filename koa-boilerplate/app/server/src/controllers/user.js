import UsersService from '../services/users'

async function index(ctx) {
  ctx.body = {
    status: 0,
    info: 'this a users response!',
  }
}

async function getUser(ctx) {
  ctx.body = await UsersService.getUser(ctx.params.userId)
}

async function getUsers(ctx) {
  ctx.body = await UsersService.getUsers()
}

async function deleteUser(ctx) {
  await UsersService.deleteUser(ctx.params.userId)
  ctx.status = 204
}

async function updateUser(ctx) {
  await UsersService.updateUser(
    ctx.params.userId,
    ctx.request.body
  )
  ctx.status = 204
}

async function userFind(ctx) {
  const user = await ctx.db.findOne({ name: ctx.params.user })
  if (user) {
    ctx.body = user
  } else {
    ctx.body = await ctx.db.insert(ctx.params.user)
  }
}

async function userSave(ctx) {
  // const user = ctx.request.body
  // const result = await ctx.db.findOne(user.username, user.password).catch(e => e)
  // if (result.code === 400) {
  //   throw new ctx.err({ message: result.message, status: result.code })
  // } else {
  //   ctx.body = result
  // }
}
async function save(ctx) {
  ctx.body = {
    status: 0,
    info: 'this a users response!',
  }
}

export default {
  index,
  save,
  find: userFind,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
}
