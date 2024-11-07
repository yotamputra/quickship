'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.User, { foreignKey: 'UserId' });
      Item.hasOne(models.Delivery, { foreignKey: 'ItemId' });
    }
  }
  Item.init({
    name: DataTypes.STRING,
    courierNote: DataTypes.STRING,
    imgURL: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};