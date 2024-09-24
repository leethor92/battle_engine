const battleQueue = require('../database/index')
const BattleProcessor = require('./BattleProcessor')

class BattleQueue {
    constructor() {
        this.queue = battleQueue

        // Process the queue
        this.queue.process(async (job) => {
            const battleProcessor = new BattleProcessor(job.data)
            return battleProcessor.processBattle()
        })
    }

    add_battle(battleData) {
        console.log(`Adding battle to queue: ${JSON.stringify(battleData)}`)
        return this.queue.add(battleData)
    }

    isEmpty() {
        return this.queue.count() === 0
    }
}

module.exports = new BattleQueue()
