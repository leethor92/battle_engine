const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/index.js')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(bodyParser.json())

// Use battle routes
app.use('/api', routes)

// to protect endpoints I would have implemented something using JWT middleware
// That way only requests that provide a valid token can make succesful requests.

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})