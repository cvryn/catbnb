'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(models.User, {foreignKey: 'ownerId', as: "Owner"})
      Spot.hasMany(models.Booking, {foreignKey: 'spotId'})
      Spot.hasMany(models.SpotImage, {foreignKey: 'spotId', })
      Spot.hasMany(models.Review, {foreignKey: 'spotId'})
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE"

    },
    address: {
      type:DataTypes.STRING,
      allowNull: false,

      // validate: {
      //   notEmpty:true
      // }
    },
    city: {
      type:DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   notEmpty:true
      // }
    },
    state: {
      type:DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   notEmpty:true
      // }
    },
    country: {
      type:DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   notEmpty:true
      // }
    },
    lat: {
      type:DataTypes.DECIMAL,
      allowNull: false,

      validate: {
        min: -90,
        max: 90,
        // notEmpty: true
      }
    },
    lng: {
      type:DataTypes.DECIMAL,
      allowNull: false,

      validate: {
        min: -180,
        max: 180,
        // notEmpty: true
      }
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 50],
        // notEmpty: true
      }
    },
    description: {
      type:DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   notEmpty:true
      // }
    },
    price: {
      type:DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0,
        // notEmpty: true
      }
    },
  }, {
    sequelize,
    modelName: 'Spot',
    // defaultScope: {
    //   attributes: {
    //     exclude: ['createdAt', 'updatedAt']
    //   }
    // }
  });
  return Spot;
};
