function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        }
    },
    computed: {
        playerBarStyles() {
            if (this.winner === 'monster') {
                return  {width: '0%'}
            }
            return  {width: this.playerHealth + '%'}
        },
        monsterBarStyles() {
            if (this.winner === 'player') {
                return  {width: '0%'}
            }
            return {width: this.monsterHealth + '%'}
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw'
            } else if (value <= 0) {
                this.winner = 'monster'
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw'
            } else if (value <= 0) {
                this.winner = 'player'
            }
        }
    },
    methods: {
        startGame() {
            this.playerHealth = 100
            this.monsterHealth = 100
            this.winner = null
            this.currentRound = 0
            this.logMessages = []
        },
        attackMonster() {
            console.log(this.logMessages)
            this.currentRound++
            const attackValue = getRandomValue(5, 12)
            this.monsterHealth -= attackValue
            this.attackPlayer()
            this.addLogMessage('player', 'attack', attackValue)
        },
        attackPlayer() {
            const attackValue = getRandomValue(5, 12)
            this.playerHealth -= attackValue
            this.addLogMessage('monster', 'attack', attackValue)

        },
        specialAttackMonster() {
            this.currentRound++
            const attackValue = getRandomValue(10, 25)
            this.monsterHealth -= attackValue
            this.addLogMessage('player', 'special-attack', attackValue)
            this.attackPlayer()
        },
        healPlayer() {
            this.currentRound++
            const healValue = getRandomValue(8, 12)
            this.addLogMessage('player', 'heal', healValue)
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue
            }
            this.attackPlayer()
        },
        surrender() {
            this.winner = 'monster'
        },
        addLogMessage(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }
    }
})

app.mount('#game')