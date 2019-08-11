class Enemy {
        update(timeDiff) {
                if (this.domElement) {
                        this.x = this.x + timeDiff * this.speed
                        this.domElement.style.left = this.x + "px"
                        setTimeout(this.gamesSpeed, 5000)
                        if (this.x + ENEMY_WIDTH > GAME_WIDTH - 70 || this.destroyed === true) {
                                this.root.removeChild(this.domElement)
                                this.destroyed = true
                        }
                } else {
                        this.x = this.x + timeDiff * this.speed
                        this.fly.style.left = this.x + "px"
                        setTimeout(this.gamesSpeed, 5000)
                        if (this.x + ENEMY_2_WIDTH > GAME_WIDTH - 70) {
                                this.root.removeChild(this.fly)
                                this.destroyed = true
                        }
                }

        }
        constructor(theRoot, enemySpot, enemyChoise) {
                this.root = theRoot
                this.spot = enemySpot
                if (enemyChoise % 2 === 1) {
                        this.y = GAME_HEIGHT - (3 * PLAYER_HEIGHT) + 65
                        this.x = -ENEMY_WIDTH
                        this.destroyed = false
                        this.domElement = document.createElement("img")
                        this.domElement.src = "images/enemy.gif"
                        this.domElement.style.position = "absolute"
                        this.domElement.style.left = this.x + "px"
                        this.domElement.style.top = this.y + "px"
                        this.domElement.style.zIndex = 5
                        theRoot.appendChild(this.domElement)
                        this.speed = Math.random() / 2 + 0.25
                } else {
                        this.y = GAME_HEIGHT - (4 * PLAYER_HEIGHT) + 65
                        this.x = -ENEMY_2_WIDTH
                        this.destroyed = false
                        this.fly = document.createElement('img')
                        this.fly.src = "images/enemyBee.png"
                        this.fly.style.position = "absolute"
                        this.fly.style.left = this.x + "px"
                        this.fly.style.top = this.y + "px"
                        this.fly.style.zIndex = 5
                        theRoot.appendChild(this.fly)
                        this.speed = Math.random() / 3 + 0.25
                }
        }
        gamesSpeed = () => {
                this.speed = Math.random() / 3 + 0.50
        }

} 