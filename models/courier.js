'use strict';
const {
  Model, fn, col
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Courier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Courier.belongsToMany(models.Delivery, { through: models.Delivery_Courier, foreignKey: 'CourierId' });
    }
    static totalCourier() {
      return Courier.findOne({
        raw: true,
        attributes: [
          [fn("COUNT", col("id")), "totalCourier"],
        ],
      });
    }
  }
  Courier.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Courier',
  });
  return Courier;
};