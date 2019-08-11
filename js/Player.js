class Player {
    constructor(root) {
        this.x = GAME_WIDTH - (4 * PLAYER_WIDTH)
        this.y = GAME_HEIGHT - (3 * PLAYER_HEIGHT) + 65
        this.jumps = undefined
        this.lifes = 3
        this.domElement = document.createElement("img")
        this.domElement.src = "images/playerMoveLeft.gif"
        this.domElement.style.position = "absolute"
        this.domElement.style.left = this.x + "px"
        this.domElement.style.top = this.y + "px"
        this.domElement.style.zIndex = "10"
        root.appendChild(this.domElement)
        this.heart = document.createElement('img')
        this.heart.src = undefined
        this.heart.style.position = "absolute"
        this.heart.style.top = "5px"
        this.heart.style.left = "5px"
        this.heart.style.zIndex = "2000"
        root.appendChild(this.heart)
    }
    update(timeDiff) {
        if (this.jumps === false) {
            this.y = this.y - timeDiff * 0.9
            this.domElement.style.top = this.y + "px"
            if (this.domElement.style.top < 290) {
                this.jumps = true
            }
        } if (this.jumps === true) {
            this.y = this.y + timeDiff * 0.8
            this.domElement.style.top = this.y + "px"
            if (this.domElement.style.top > 440) {
                this.jumps = undefined
            }
        } if (this.jumps === undefined) {
            this.y = GAME_HEIGHT - (3 * PLAYER_HEIGHT) + 65
            this.domElement.style.top = this.y + "px"
        }
    }
}