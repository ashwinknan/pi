const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Participant extends Model {}

Participant.init({
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  additional_info: DataTypes.TEXT,
}, {
  sequelize,
  modelName: 'participant'
});

module.exports = Participant;
