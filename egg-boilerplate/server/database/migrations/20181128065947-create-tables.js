'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TINYINT, UUID, UUIDV4 } = Sequelize;

    // 用户表
    // 在执行数据库升级时调用的函数，创建 user 表
    await queryInterface.createTable(
      'user',
      {
        id: {
          allowNull: false,
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        username: STRING(30),
        password: STRING(30),
        email: {
          type: STRING(40),
          unique: true
        },
        email_verifyed: {
          type: TINYINT(1),
          defaultValue: 0
        },
        avatar: STRING(255),
        uniq_id: {
          type: UUID,
          defaultValue: UUIDV4,
          primaryKey: true,
          allowNull: false
        },
        created_at: {
          allowNull: false,
          type: DATE
        },
        updated_at: {
          allowNull: false,
          type: DATE
        }
      },
      {
        indexes: [
          {
            fields: ['email'],
            unique: true
          },
          {
            fields: ['uniq_id'],
            unique: true
          }
        ]
      }
    );

    //
    //
  },

  down: async queryInterface => {
    // 用户表
    // 在执行数据库降级时调用的函数，删除 user 表
    await queryInterface.dropTable('user');

    //
    //
  }
};
