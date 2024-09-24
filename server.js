const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/index.js') // Adjust the path as needed

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(bodyParser.json())

// Use battle routes
app.use('/api', routes) // Make sure this line is correct

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
