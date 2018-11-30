'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async findByUserId({ id }) {
    const ctx = this.ctx;
    const user = await ctx.model.User.findById(id);
    return user;
  }

  async findByUserUniqId({ uniq_id }) {
    const ctx = this.ctx;
    const user = await ctx.model.User.findOne({
      where: {
        uniq_id
      }
    });
    return user;
  }

  async findByEmail({ email }) {
    const ctx = this.ctx;
    const user = await ctx.model.User.findOne({
      where: {
        email
      }
    });
    return user;
  }
}

module.exports = UserService;
