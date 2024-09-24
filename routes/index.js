const express = require('express')
const router = express.Router()

// Test Route
router.get('/test', (req, res) => {
    res.send({ message: 'Battle Engine API is running!' })
})

module.exports = router