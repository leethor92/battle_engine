const express = require('express')
const router = express.Router()
const battleQueue = require('../battles/b_queue')

// Test Route that could be used in future as a health endpoint for lb checks
router.get('/test', (req, res) => {
    res.send({ message: 'Battle Engine API is running!' })
})

router.post('/submit', async (req, res) => {
  const { attackerId, defenderId } = req.body

  // Basic validation for incoming data
  if (!attackerId || !defenderId) {
    return res.status(400).json({ message: 'Attacker ID and Defender ID are required.' });
  }

  try {
    // Enqueue the battle
    await battleQueue.add_battle({ attackerId, defenderId });
    res.status(200).json({ message: 'Battle submitted!' });
  } catch (error) {
    console.error('Error adding battle to the queue:', error);
    res.status(500).json({ message: 'An error occurred while submitting the battle.' });
  }
})

module.exports = router