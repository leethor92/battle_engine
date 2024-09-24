const battleQueue = require('../database/index') // Adjust the path as needed

class BattleQueue {
    constructor() {
        // No need to initialize a new queue here we use the one from db/index
        this.queue = battleQueue
        
        // Process the queue
        this.queue.process(async (job) => {
            return this.processBattle(job.data)
        })
    }

    add_battle(battle) {
        // Add a battle to the queue
        return this.queue.add(battle)
    }

    async processBattle(battle) {
        // Your battle processing logic goes here
        console.log(`Processing battle: ${JSON.stringify(battle)}`)

        // Simulate battle processing with a timeout
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Log the battle results or update player stats here
        console.log(`Finished processing battle: ${JSON.stringify(battle)}`)

        // Add your logic to update player stats and log the battle results here
    }

    isEmpty() {
        // Check if the queue has any jobs
        return this.queue.count() === 0
    }
}

module.exports = new BattleQueue()
