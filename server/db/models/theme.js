'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Theme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.User, { foreignKey: 'theme_id' });
    }
  }
  Theme.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      layout: { allowNull: false, type: DataTypes.STRING },
      castle: { allowNull: false, type: DataTypes.STRING },
      enemy: { allowNull: false, type: DataTypes.STRING },
      background: { allowNull: false, type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'Theme',
    }
  );
  return Theme;
};
