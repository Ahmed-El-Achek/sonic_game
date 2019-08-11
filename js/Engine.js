class Engine {
  constructor(theRoot) {
    this.root = theRoot
    this.player = new Player(this.root)
    this.topScore = new Text(this.root, 690, 0)
    this.enemies = []
    this.coins = []
    this.maps = []
    this.counter = 0
    this.scores = 0
    this.map = new Map(this.root)
    this.sound = document.createElement("audio")
    this.sound.src = "sound/themeMap.mp3"
    this.sound.autoplay = true
    this.sound.muted = false
    this.sound.style.display = "none"
  }

  gameLoop = () => {
    this.sound.play()
    if (this.lastFrame === undefined) this.lastFrame = (new Date).getTime()
    let timeDiff = (new Date).getTime() - this.lastFrame
    this.lastFrame = (new Date).getTime()
    this.enemies.forEach(enemy => {
      enemy.update(timeDiff)
    }
    )
    this.topScore.update("Scores: " + this.scores)
    this.enemies = this.enemies.filter(enemy => {
      return !enemy.destroyed
    })
    while (this.enemies.length < MAX_ENEMIES) {
      let spot = nextEnemySpot(this.enemies)
      let randomEnemy = Math.floor(Math.random() * 10) + 1
      this.enemies.push(new Enemy(this.root, spot, randomEnemy))
    }


    this.coins.forEach(coin => {
      coin.update(timeDiff)
    })
    this.coins = this.coins.filter(coin => {
      return !coin.destroyed
    })
    while (this.coins.length < MAX_COINS) {
      let spots = nextCoinSpot(this.coins)
      this.coins.push(new Coin(this.root, spots))
    }

    this.isPlayerDead()
    this.playerLife()
    this.killEnemy1()
    this.gainCoins()
    this.counter += 1
    if (this.counter === 500) {
      if (MAX_ENEMIES < 8) {
        MAX_ENEMIES += 1
        this.counter = 0
      }
    }
    if (this.player.y < 290) {
      this.player.jumps = true
      this.player.update(timeDiff)
    }
    if (this.player.y > 440) {
      this.player.domElement.src = "images/playerMoveLeft.gif"
      this.player.jumps = undefined
      this.player.update(timeDiff)
    }
    document.addEventListener("keydown", this.keydownHandler)
    this.player.update(timeDiff);
    setTimeout(this.gameLoop, 15)
  }
  isPlayerDead = () => {
    this.enemies.find(enemy => {
      if (enemy.domElement) {
        if (enemy.x + ENEMY_WIDTH > this.player.x && this.player.jumps !== true) {
          document.getElementById('lostCash').play()
          this.player.domElement.src = "images/sonicHit.gif"
          setTimeout(this.sonicHit, 400)
          enemy.destroyed = true
          this.player.lifes -= 1
          this.scores = 0
          if (this.player.lifes === 0) {
            this.player.lifes = 3
            MAX_ENEMIES = undefined
            MAX_COINS = 0
            this.counter = 0
            this.map.domElement.src = "images/gameover.gif"
            this.map.domElement.style.zIndex = "2000"
            document.getElementById('gameover').play()
            document.getElementById('lostCash').pause()
            this.sound.muted = true
            document.getElementById('cash').pause()
            setTimeout(this.gameOver, 10000)
          }
        }
      } else {
        if (enemy.y + ENEMY_HEIGHT > this.player.y && enemy.y < this.player.y + PLAYER_HEIGHT && enemy.x + ENEMY_WIDTH > this.player.x && enemy.x < this.player.x + PLAYER_WIDTH) {

          this.player.domElement.src = "images/sonicHit.gif"
          setTimeout(this.sonicHit, 300)
          this.scores = 0
          this.player.lifes = 3
          MAX_ENEMIES = undefined
          MAX_COINS = 0
          this.counter = 0
          this.jumps = undefined
          this.map.domElement.src = "images/gameover.gif"
          this.map.domElement.style.zIndex = "2000"
          this.sound.muted = true
          document.getElementById('cash').pause()
          document.getElementById('gameover').play()
          setTimeout(this.gameOver, 10000)


        }
      }

    })
  }
  killEnemy1 = () => {
    this.enemies.find(enemy => {
      if (enemy.domElement) {
        if (enemy.y < this.player.y + PLAYER_HEIGHT && enemy.x + ENEMY_WIDTH > this.player.x && this.player.jumps === true) {
          enemy.destroyed = true
          this.scores += 50
          document.getElementById('enemyKill').play()
        }
      }

    })

  }
  gainCoins = () => {
    this.coins.find(coin => {
      if (coin.y + COINS_HEIGHT > this.player.y && coin.y < this.player.y + PLAYER_HEIGHT && coin.x + COINS_WIDTH > this.player.x) {
        this.scores += 10
        document.getElementById('cash').play()
        coin.destroyed = true
      }
    })
  }
  playerLife = () => {
    if (this.player.lifes === 3) {
      this.player.heart.src = "images/3lifes.gif"
    }
    if (this.player.lifes === 2) {
      this.player.heart.src = "images/2lifes.gif"
    }
    if (this.player.lifes === 1) {
      this.player.heart.src = "images/life.gif"
    }
  }
  gameOver = () => {
    this.map.domElement.src = "images/sonicMap.gif"
    this.map.domElement.style.zIndex = "5"
    MAX_COINS = 1
    MAX_ENEMIES = 3
    this.sound.muted = false
    location.reload()
  }
  sonicHit = () => {
    this.player.domElement.src = "images/playerMoveLeft.gif"
  }
  keydownHandler = event => {
    if (event.key === "w") {
      document.getElementById('jump').play()
      if (this.player.jumps === undefined)
        this.player.jumps = false
      this.player.domElement.src = "images/playerJump.gif"
      if (this.player.y > 290) {
        this.player.jumps = false
      }
    }
  }

}
