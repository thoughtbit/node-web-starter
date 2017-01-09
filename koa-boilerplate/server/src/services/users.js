import db from './../db'
import NotFoundError from './../helpers/errors/NotFoundError'

const UsersService = {
  // async createUser(user) {
  //   return await db.execute(async (transaction) => {   
  //   })
  // },
  async getUser(userId) {
    const user = await db.models.Users.findById(userId, {
      attributes: ['id', 'name', 'email'],
    })
    if (!user) {
      throw new NotFoundError(
        ` 您查询的${userId}出错了！`
      )
    }
    return user
  },

  async getUsers() {
    const users = await db.models.Users.findAll({ where: { id: [1, 2, 3] } })
    if (!users) {
      throw new NotFoundError(
         ' 您查询的记录不存在！'
      )
    }
    return users
  },

  async updateUser(userId, users) {
    await db.execute(async (transaction) => {
      const user = await this.getUser(userId, { transaction })
      await user.update(users, { transaction })
    })
  },

  async deleteUser(userId) {
    return await db.models.Users.destroy({ where: { id: userId } })
  },
}

export default UsersService

