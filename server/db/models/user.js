'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  /**
   * Represents a user in the system.
   * @class User
   * @extends Model
   */
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @static
     * @param {object} models - The Sequelize models object.
     */
    static associate(models) {
      this.hasMany(models.Result, { foreignKey: 'user_id' });
      this.belongsTo(models.Theme, { foreignKey: 'theme_id' });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      img: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      user_level: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      theme_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 1,
        references: {
          model: 'Themes',
          key: 'id',
        },
      },
      google_id: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
