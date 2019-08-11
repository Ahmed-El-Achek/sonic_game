class Coin {
        update(timeDiff) {
                this.x = this.x + timeDiff * this.speed
                this.domElement.style.left = this.x + "px"
                if (this.x + COINS_WIDTH > GAME_WIDTH - 70 || this.destroyed === true) {
                        this.root.removeChild(this.domElement)
                        this.destroyed = true
                }
        }
        constructor(theRoot, coinSpot) {
                this.root = theRoot
                this.spot = coinSpot
                this.y = GAME_HEIGHT - (coinSpot * PLAYER_HEIGHT) + 65
                this.x = -COINS_WIDTH
                this.destroyed = false
                this.domElement = document.createElement("img")
                this.domElement.src = "images/rings.gif"
                this.domElement.style.position = "absolute"
                this.domElement.style.left = this.x + "px"
                this.domElement.style.top = this.y + "px"
                this.domElement.style.zIndex = 5
                theRoot.appendChild(this.domElement)
                this.speed = Math.random() / 2 + 0.5
        }
} 