'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Listing.belongsTo(models.Listing, { foreignKey: 'profileId'})
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
  }
  }, {
    sequelize,
    modelName: 'Listing',
  });
  return Listing;
};