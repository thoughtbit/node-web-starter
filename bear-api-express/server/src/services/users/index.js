import db from './../../helpers/db/mysql'
import users from '../../../../../express-boilerplate/server/src/models/users'

const UsersService = {
  async getUser(userId) {
    const user = await User.query()
      .findById(userId)
      .eager('[roles,socialMedia]')
      .omit(['password'])
    if (!user) {
      console.log(`您查询的${userId}出错了`)
    }
    return user
  },

  async getUsername() {
    const user = await User.query()
      .where({ username: req.params.username })
      .eager('[roles,socialMedia]')
      .omit(['password'])
      .first()
    if (!user) {
      console.log('您查询的记录不存在')
    }
    return user
  },
}

export default UsersService

