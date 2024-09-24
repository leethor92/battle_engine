const Queue = require('bull')
const Worker = require('bull')

// Initialize the battle queue
const battleQueue = new Queue('battleQueue', {
  redis: {
    host: process.env.REDIS_HOST, // e.g. 'localhost'
    port: process.env.REDIS_PORT, // e.g. 6379
  }
})

// Log any Redis errors
battleQueue.on('error', (error) => {
    console.error('Redis error:', error)
})

// Set up a worker to process jobs
const worker = new Worker('battleQueue', async (job) => {
    console.log(`Processing battle: ${job.data}`)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate processing
    console.log(`Finished processing battle: ${job.data}`)
    return { success: true }
})

// Log any worker errors
worker.on('error', (error) => {
    console.error('Worker error:', error)
})

worker.on('completed', (job, result) => {
  console.log(`Job completed with result: ${JSON.stringify(result)}`)
})

// Optional: Handle job failure
worker.on('failed', (job, err) => {
  console.error(`Job failed with error: ${err.message}`)
})

module.exports = battleQueue
