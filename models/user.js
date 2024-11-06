'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Item, { foreignKey: 'userId' });
      User.hasMany(models.Delivery, { foreignKey: 'senderId' });
      User.hasMany(models.Delivery, { foreignKey: 'receiverId' });
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longtitude: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};