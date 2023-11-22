const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Interview extends Model {}

Interview.init({
  participant_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'participants',
      key: 'id'
    }
  },
  audio_url: DataTypes.TEXT,
  video_url: DataTypes.TEXT,
  details: DataTypes.TEXT,
}, {
  sequelize,
  modelName: 'interview'
});

module.exports = Interview;
