'use strict';

module.exports = app => {
  const { STRING, TINYINT, UUID, UUIDV4 } = app.Sequelize;

  const User = app.model.define(
    'user',
    {
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
      }
    },
    {
      ...app.config.modelCommonOption,
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

  return User;
};
