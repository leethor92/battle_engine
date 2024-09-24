const Redis = require('ioredis')
const Joi = require('joi')
const { v4: uuidv4 } = require('uuid')

const redis = new Redis() // Adjust your Redis connection options if needed

class Player {
  static redis // Static property to hold the Redis instance

  // Static method to set the Redis instance for testing
  static setRedis(redisInstance) {
    Player.redis = redisInstance
  }

  constructor(name, gold, attackValue, hitPoints, luckValue) {
    this.identifier = uuidv4()
    this.name = name
    this.gold = gold
    this.attackValue = attackValue
    this.hitPoints = hitPoints
    this.luckValue = luckValue
  }

  // Define the Joi schema for validation
  static get schema() {
    return Joi.object({
      name: Joi.string().min(1).max(20).required(),
      gold: Joi.number().min(0).max(1000000000).required(),
      attackValue: Joi.number().min(0).required(),
      hitPoints: Joi.number().greater(0).required(),
      luckValue: Joi.number().min(0).required(),
    })
  }

    // Validate player data using Joi
  validate() {
    const { error } = Player.schema.validate({
      name: this.name,
      gold: this.gold,
      attackValue: this.attackValue,
      hitPoints: this.hitPoints,
      luckValue: this.luckValue,
      })
      if (error) {
        throw new Error(error.details[0].message)
      }
  }

  // Save player to Redis
  async save() {
    this.validate()
    // Check if a player with the same name already exists
    const existingPlayer = await redis.sismember('playerNames', this.name)
    if (existingPlayer) {
      throw new Error(`Player with name ${this.name} already exists.`)
    } else {
      console.log("no player with the name", this.name)
    }
    const playerData = {
      identifier: this.identifier,
      name: this.name,
      gold: this.gold,
      attackValue: this.attackValue,
      hitPoints: this.hitPoints,
      luckValue: this.luckValue,
    }

    await redis.set(this.identifier, JSON.stringify(playerData))

    await redis.sadd('playerNames', this.name)
    console.log(`Player ${this.name} created with identifier ${this.identifier}.`)
  }

  // Fetch player data from Redis
  static async getPlayer(name) {
    const playerData = await redis.get(name);
    return playerData ? JSON.parse(playerData) : null;
  }
}

module.exports = Player
