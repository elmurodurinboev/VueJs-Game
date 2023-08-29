function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
console.log(getRandomValue(5, 12))
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    }
  },
  computed: {
    monsterHealthBar() {
      if (this.monsterHealth < 0) {
        return { width: 0 }
      }
      return { width: this.monsterHealth + "%" }
    },
    playerHealthBar() {
      if (this.playerHealth < 0) {
        return { width: 0 }
      }
      return { width: this.playerHealth + "%" }
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // It's a draw
        this.winner = "draw"
      } else if (value <= 0) {
        // You lost
        this.winner = "monster"
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // It's a draw
        this.winner = "draw"
      } else if (value <= 0) {
        // You won
        this.winner = "player"
      }
    },
  },
  methods: {
    newGame() {
      this.playerHealth = 100
      this.monsterHealth = 100
      this.currentRound = 0
      this.winner = null
      this.logMessages = []
    },
    surrender() {
      this.winner = "monster"
    },
    attackMonster() {
      this.currentRound++
      const attackValue = getRandomValue(5, 12)
      this.monsterHealth -= attackValue
      this.adLogMessage("player", "attack", attackValue)
      this.attackPlayer()
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15)
      this.playerHealth -= attackValue
      this.adLogMessage("monster", "attack", attackValue)
    },
    specialAttackMonster() {
      this.currentRound++
      const attackValue = getRandomValue(10, 25)
      this.monsterHealth -= attackValue
      this.adLogMessage("player", "attack", attackValue)
      this.attackPlayer()
    },
    healPlayer() {
      const healValue = getRandomValue(10, 20)
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100
      } else {
        this.playerHealth += healValue
      }
      this.adLogMessage("player", "heal", healValue)
      this.attackPlayer()
    },
    adLogMessage(who, what, value) {
      this.logMessages.unshift({
        attactBy: who,
        attactType: what,
        attactValue: value,
      })
    },
  },
})

app.mount("#game")
