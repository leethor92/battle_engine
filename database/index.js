const Queue = require('bull')

// Initialize the battle queue
const battleQueue = new Queue('battleQueue', {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
})

// Log any Redis errors
battleQueue.on('error', (error) => {
  console.error('Redis error:', error)
})

// Log when a job starts processing
battleQueue.on('active', (job) => {
  console.log(`Job ${job.id} is now active and being processed.`)
})

// Log when a job completes
battleQueue.on('completed', (job, result) => {
  console.log(`Job ${job.id} completed successfully with result: ${JSON.stringify(result)}`)
})

module.exports = battleQueue
