const Queue = require('bull')
const Worker = require('bull')

// Initialize the battle queue
const battleQueue = new Queue('battleQueue', {
  redis: {
    host: process.env.REDIS_HOST, // e.g. 'localhost'
    port: process.env.REDIS_PORT, // e.g. 6379
    // No need for maxRetriesPerRequest and enableReadyCheck options
  }
  // maxRetriesPerRequest: null, // Disable automatic retries
  // enableReadyCheck: false, // Disable ready check
})

// Log any Redis errors
battleQueue.on('error', (error) => {
    console.error('Redis error:', error)
})

// Optionally set up a worker to process jobs
const worker = new Worker('battleQueue', async (job) => {
    // Your job processing logic here
    console.log(`Processing battle: ${job.data}`)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate processing
    console.log(`Finished processing battle: ${job.data}`)
})

// Log any worker errors
worker.on('error', (error) => {
    console.error('Worker error:', error)
})

module.exports = battleQueue
