class Battle {
  constructor(player1, player2) {
      this.player1 = player1
      this.player2 = player2
  }

  async process() {
    while (this.player1.hp > 0 && this.player2.hp > 0) {
      const currentAttacker = this.player1
      const currentDefender = this.player2
      // Calculate attack value based on current health
      const attackValue = (currentAttacker.attack * currentAttacker.hp) / currentAttacker.maxHp
      const missChance = Math.random()

      if (missChance > currentDefender.luck) {
        currentDefender.hp -= attackValue
        console.log(`${currentAttacker.id} hits ${currentDefender.id} for ${attackValue}`)
      } else {
        console.log(`${currentAttacker.id} misses ${currentDefender.id}`)
      }
      // Swap roles
      this.player1 = currentDefender
      this.player2 = currentAttacker
    }

    // Determine winner and gold stolen
    const loser = this.player2.hp <= 0 ? this.player2 : this.player1
    const winner = this.player2.hp > 0 ? this.player2 : this.player1

    const goldStolen = Math.floor(Math.random() * (0.2 - 0.1) * loser.gold) + 0.1 * loser.gold

    console.log(`${winner.id} wins! ${loser.id} loses ${goldStolen} gold. winnerhp ${winner.hp}. loserhp ${loser.hp}.`)
    return { winner: winner.id, loser: loser.id, goldStolen, winnerHP: winner.hp, loserHP: loser.hp }
  }
}

module.exports = Battle
