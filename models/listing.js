'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Listing extends Model {
    static associate(models) {
      Listing.belongsTo(models.Profile, { 
        foreignKey: 'profileId'
      })
    }
  }

  Listing.init({
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photos: DataTypes.ARRAY(DataTypes.STRING),
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    condition: {
      type: DataTypes.ENUM('Like New', 'Fair', 'Poor'),
      defaultValue: 'Poor'
    },
    type: {
      type: DataTypes.ENUM('Movie', 'Books', 'Music'),
    },
    openToTrade: DataTypes.BOOLEAN,
    price: DataTypes.INTEGER,
    profileId: {
      type: DataTypes.INTEGER,
			allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Profiles',
        key: 'id'
      }
    },
    sold: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'Listing',
  });
  return Listing;
};