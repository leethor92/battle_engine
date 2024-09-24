const BattleProcessor = require('../BattleProcessor')

describe('BattleProcessor', () => {
    let battleProcessor

    beforeEach(() => {
        const attackerId = 'attacker'
        const defenderId = 'defender'
        battleProcessor = new BattleProcessor({ attackerId, defenderId })
    })

    test('should correctly process the battle', async () => {
        const result = await battleProcessor.processBattle()
        
        // Check that the result has the expected properties
        expect(result).toHaveProperty('winner')
        expect(result).toHaveProperty('loser')
        expect(result).toHaveProperty('goldStolen')
    })
})
