const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Study extends Model {}

Study.init({
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
}, {
  sequelize,
  modelName: 'study'
});

module.exports = Study;
