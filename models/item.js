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

    static async getTotalItem() {
      return await Item.count();
    }
  }

  Item.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name is required."
        },
        notEmpty: {
          msg: "Name cannot be empty."
        },
      }
    },
    courierNote: {
      type: DataTypes.STRING
    },
    imgURL: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: "Image URL must be a valid URL."
        },
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Item',
  });

  return Item;
};
