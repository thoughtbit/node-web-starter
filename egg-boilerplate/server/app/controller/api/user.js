'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async getUser() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      data: {}
    };
  }
}

module.exports = UserController;
