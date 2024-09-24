const { Sequelize } = require('sequelize')

// Use your created username and password
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
})

(async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})()

module.exports = sequelize