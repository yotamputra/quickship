'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define associations here
      User.hasMany(models.Item, { foreignKey: 'UserId' });
      User.hasMany(models.Delivery, { foreignKey: 'SenderId' });
      User.hasMany(models.Delivery, { foreignKey: 'ReceiverId' });
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Email is already in use!'
        },
        validate: {
          notEmpty: {
            msg: 'Email cannot be empty!'
          },
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6],
            msg: 'Password must be at least 6 characters long!'
          },
          notEmpty: {
            msg: 'Password cannot be empty!'
          }
        }
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  User.addHook('beforeCreate', 'emailToLowercase', (user) => {
    user.email = user.email.toLowerCase();
  });

  return User;
};
