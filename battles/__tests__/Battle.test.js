const Battle = require('../Battle')

describe('Battle', () => {
    let player1
    let player2
    let battle

    beforeEach(() => {
        player1 = { id: 'player1', hp: 100, attack: 30, luck: 0.1, gold: 1000, maxHp: 100 }
        player2 = { id: 'player2', hp: 100, attack: 40, luck: 0.2, gold: 1000, maxHp: 100 }
        battle = new Battle(player1, player2)
    })

    test('should correctly process a battle until one player is defeated', async () => {
        const result = await battle.process()
        // Assert that one of the player's HP is less than or equal to 0
        expect(result.loserHP).toBeLessThanOrEqual(0)  // Ensure loser’s HP is 0 or less
    })

    test('should steal the correct amount of gold from the loser', async () => {
        const result = await battle.process()

        const loser = result.loser === player1.id ? player1 : player2

        // Calculate the expected range for gold stolen
        const minGoldStolen = Math.floor(0.1 * loser.gold)
        const maxGoldStolen = Math.floor(0.2 * loser.gold)

        // Check if the result is within the expected range
        expect(result.goldStolen).toBeGreaterThanOrEqual(minGoldStolen)
        expect(result.goldStolen).toBeLessThanOrEqual(maxGoldStolen)
    })
})
