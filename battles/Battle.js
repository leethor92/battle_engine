class Battle {
  constructor(attacker, defender) {
      this.attacker = attacker
      this.defender = defender
  }

  async process() {
      while (this.attacker.hp > 0 && this.defender.hp > 0) {
          // Calculate attack value based on current health
          const attackValue = (this.attacker.attack * this.attacker.hp) / this.attacker.maxHp
          const missChance = Math.random()

          if (missChance > this.defender.luck) {
              this.defender.hp -= attackValue
              console.log(`${this.attacker.id} hits ${this.defender.id} for ${attackValue}`)
          } else {
              console.log(`${this.attacker.id} misses ${this.defender.id}`)
          }

          // Swap roles
          [this.attacker, this.defender] = [this.defender, this.attacker]
      }

      // Determine winner and gold stolen
      const loser = this.defender.hp <= 0 ? this.defender : this.attacker
      const winner = this.defender.hp > 0 ? this.defender : this.attacker

      const goldStolen = Math.floor(Math.random() * (0.2 - 0.1) * loser.gold) + 0.1 * loser.gold

      console.log(`${winner.id} wins! ${loser.id} loses ${goldStolen} gold.`)
      return { winner: winner.id, loser: loser.id, goldStolen }
  }
}

module.exports = Battle
