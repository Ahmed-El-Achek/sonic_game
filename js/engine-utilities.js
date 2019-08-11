let nextEnemySpot = enemies => {
        let enemySpots = GAME_HEIGHT - (3 * PLAYER_HEIGHT) + 20
        let spotsTaken = [false, false, false, false, false,]
        enemies.forEach(enemy => {
                spotsTaken[enemy.spot] = true
        })
        let candidate = undefined
        while (candidate === undefined || spotsTaken[candidate]) {
                candidate = Math.floor(Math.random() * enemySpots)
        }
        return candidate
}
let nextCoinSpot = rings => {
        let coinSpots = GAME_HEIGHT - (4 * PLAYER_HEIGHT) + 20
        let spotsTaken = [false, false]
        rings.forEach(ring => {
                spotsTaken[ring.spot] = true
        })
        let candidate = undefined
        while (candidate === undefined || spotsTaken[candidate]) {
                candidate = Math.floor(Math.random() * 20) + 1
        }
        if (candidate % 2 === 1) {
                return 3
        } else {
                return 4
        }
}