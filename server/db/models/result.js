'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.Level, { foreignKey: 'level_id' });
    }
  }
  Result.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      level_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      time: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      score: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      monsters: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Result',
    }
  );
  return Result;
};
