const { DataTypes } = require('sequelize')
const sequelize = require('../database') // Adjust path as needed

const Player = sequelize.define('Player', {
  identifier: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false,
  },
  gold: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      max: 1000000000, // 1 billion max
    },
  },
  attackValue: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hitPoints: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  luckValue: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

// Sync the model with the database
(async () => {
  await sequelize.sync()
  console.log('Player model synced with the database.')
})()

module.exports = Player
