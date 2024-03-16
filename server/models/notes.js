const DataTypes = require('sequelize');
const { sequelize } = require('../database.js');

const Notes = sequelize.define('notes', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  repo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Notes;
