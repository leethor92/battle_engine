const Redis = require('ioredis-mock') // Use ioredis-mock to avoid connecting to actual Redis
const Player = require('../Player')

// Mock Redis instance
const redis = new Redis()
Player.setRedis(redis) // Allow the Player class to use the mocked Redis instance

describe('Player', () => {
    beforeEach(async () => {
      await redis.flushall() // Clear all keys before each test
    })

    test('should create a new player with a unique name', async () => {
        const player = new Player('Player4', 1000, 30, 100, 10)
        await player.save()

        const savedPlayer = await Player.getPlayer(player.identifier)
        expect(savedPlayer).toBeDefined()
        expect(savedPlayer.name).toBe('Player4')
        expect(savedPlayer.gold).toBe(1000)
    })

    test('should throw an error when creating a player with a duplicate name', async () => {
        const player1 = new Player('Player5', 1000, 30, 100, 10)
        await player1.save()

        const player2 = new Player('Player5', 2000, 40, 90, 20)
        await expect(player2.save()).rejects.toThrow('Player with name \"Player5\" already exists.')
    })

    test('should throw an error if player name is invalid', async () => {
      const player = new Player('Player3', 1000, 30, 100, 10)
      player.name = '' // Set an invalid name
  
      // Use expect().rejects.toThrow for async validation
      await expect(player.save()).rejects.toThrow('"name" is not allowed to be empty');
    })

    test('should save and retrieve player data correctly', async () => {
        const player = new Player('Player123', 500, 20, 80, 15)
        await player.save()

        const retrievedPlayer = await Player.getPlayer(player.identifier)
        expect(retrievedPlayer.name).toBe('Player123')
        expect(retrievedPlayer.gold).toBe(500)
    })
})
