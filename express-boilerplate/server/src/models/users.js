export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    tableName: 'dw_users',
  }, {
    classMethods: {
      associate(models) {
        Users.hasMany(models.Tasks)
      },
    },
  })
  return Users
}
