const express = require('express')
const router = express.Router()
const battleQueue = require('../battles/BattleQueue')
const Player = require('../models/Player')

// Test Route that could be used in future as a health endpoint for lb checks
router.get('/test', (req, res) => {
    res.send({ message: 'Battle Engine API is running!' })
})

// Submit battle route
router.post('/submit', async (req, res) => {
  const { attackerId, defenderId } = req.body
  await battleQueue.add_battle({ attackerId, defenderId })
  res.status(200).json({ message: 'Battle submitted!' })
})

// Endpoint to create a new player
router.post('/addPlayer', async (req, res) => {
  const { name, gold, attackValue, hitPoints, luckValue } = req.body

  // Create a new Player instance
  const player = new Player(name, gold, attackValue, hitPoints, luckValue)

  try {
    // Save the player to Redis
    await player.save()
    res.status(201).json({
      message: 'Player created successfully',
      player: {
        identifier: player.identifier,
        name: player.name,
        gold: player.gold,
        attackValue: player.attackValue,
        hitPoints: player.hitPoints,
        luckValue: player.luckValue,
      },
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router