export default (sequelize, DataTypes) => {
  const Setting = sequelize.define('Setting', {
    id: {
      type: DataTypes.INTEGER(11),
    },
    key: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.STRING,
    },
    label: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  })
  return Setting
}
