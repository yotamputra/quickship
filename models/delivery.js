'use strict';
const {
  Model, fn, col
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Delivery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Delivery.belongsTo(models.User, { foreignKey: 'SenderId', as: 'sender' });
      Delivery.belongsTo(models.User, { foreignKey: 'ReceiverId', as: 'receiver' });
      Delivery.belongsTo(models.Item, { foreignKey: 'ItemId' });
      Delivery.belongsToMany(models.Courier, { through: models.Delivery_Courier, foreignKey: 'DeliveryId' });
    }

    get deliveryStatus() {
      if (!this.status) {
        return 'PENDING'
      } else {
        return this.status.toUpperCase()
      }
    }
  }
  Delivery.init({
    SenderId: DataTypes.INTEGER,
    ReceiverId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Delivery',
  });
  return Delivery;
};