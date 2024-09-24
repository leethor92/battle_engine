const express = require('express')
const router = express.Router()
const battleQueue = require('../battles/BattleQueue')

// Test Route that could be used in future as a health endpoint for lb checks
router.get('/test', (req, res) => {
    res.send({ message: 'Battle Engine API is running!' })
})

// Submit battle route
router.post('/submit', async (req, res) => {
  const { attackerId, defenderId } = req.body;
  await battleQueue.add_battle({ attackerId, defenderId });
  res.status(200).json({ message: 'Battle submitted!' });
})

module.exports = router