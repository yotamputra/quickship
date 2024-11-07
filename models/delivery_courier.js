'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Delivery_Courier extends Model {
    static associate(models) {
      Delivery_Courier.belongsTo(models.Delivery, { foreignKey: 'DeliveryId' });
      Delivery_Courier.belongsTo(models.Courier, { foreignKey: 'CourierId' });
    }
  }
  Delivery_Courier.init({
    DeliveryId: DataTypes.INTEGER,
    CourierId: DataTypes.INTEGER,
    assignAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'PENDING'
    }
  }, {
    sequelize,
    modelName: 'Delivery_Courier',
  });
  return Delivery_Courier;
};
