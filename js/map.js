class Map {
    constructor(root, posMap) {
        this.root = root
        this.x = posMap
        this.y = 0
        this.destroyed = false
        this.domElement = document.createElement("img")
        this.domElement.src = "images/sonicMap.gif"
        this.domElement.style.position = "absolute"
        this.domElement.style.left = this.x + "px"
        this.domElement.style.top = this.y + "px"
        this.domElement.style.zIndex = "5"
        root.appendChild(this.domElement)
    }
}