const Battle = require('./Battle')

class BattleProcessor {

    constructor({ attackerId, defenderId }) {
      // stubbed data, this would be populated from the endpoint
      this.attacker = { id: attackerId, name: 'neverloses123', hp: 100, attack: 30, luck: 0.1, gold: 1000, maxHp: 100 }
      this.defender = { id: defenderId, name: 'gonnawin234', hp: 100, attack: 40, luck: 0.2, gold: 1000, maxHp: 100 }
    }

    async processBattle() {
        const result = await new Battle(this.attacker, this.defender).process()
        // Log or handle the result, e.g., updating player stats in the database
        console.log(result)
        return result
    }
}

module.exports = BattleProcessor
