import { Running, Jumping, Falling, Rolling, Hit } from "./playerState.js"
import { Collision } from "./collision.js"

export class Player {
    constructor(game) {
        this.game = game 
        this.width = 98
        this.height = 139
        this.x = 0 
        this.y = this.game.height - this.height
        this.vy = 0 
        this.weight = 1 
        this.image = document.getElementById('player_run')
        this.frameX = 0
        this.maxFrame
        this.fps = 140 
        this.frameInterval = 1000/this.fps
        this.frameTimer = 0
        this.speed = 0 
        this.maxSpeed = 10
        this.states = [new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Hit(this.game)]
    }
    update(input, deltaTime) {
        this.checkCollision()
        this.currentState.handleInput(input)
        
        // horizontal movement
        this.x += this.speed
        if (input.includes('ArrowRight') && this.currentState !== this.states[4]) this.speed = this.maxSpeed
        else if (input.includes('ArrowLeft') && this.currentState !== this.states[4]) this.speed = -this.maxSpeed
        else this.speed = 0

        // horizontal boundaries
        if (this.x < 0) this.x = 0
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width

        // sprite animation
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0
            if (this.frameX < this.maxFrame) this.frameX++
            else this.frameX = 0
        }
        else {
            this.frameTimer += deltaTime
        }
        
        // vertical movement
        this.y += this.vy
        if (!this.onGround()) this.vy += this.weight
        else this.vy = 0

        // vertical boundaries
        if (this.y > this.game.height - this.height) this.y = this.game.height - this.height
        
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
    }
    onGround() {
        
        return this.y >= this.game.height - this.height
    }
    setState(state, speed) {
        this.currentState = this.states[state]
        this.game.speed = this.game.maxSpeed * speed 
        this.currentState.enter()
    }
    checkCollision() {
        this.game.enemies.forEach(enemy => {
            if (
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height && 
                enemy.y + enemy.height > this.y 
            ) {
                // collision detected
                enemy.markedForDeletion = true 
                this.game.collisions.push(new Collision(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5))
                if (this.currentState === this.states[3] /*|| this.currentState === this.states[5]*/) {
                    this.game.score++
                }
                else {
                    this.setState(4, 0)
                    // can punish player by reducing  lives on collision
                    // reduce score by 5 on collision
                    if (this.game.score >= 0 && this.game.score < 5) this.game.score = 0 
                    else this.game.score -= 5
                    this.game.lives--
                    if (this.game.lives <= 0) this.game.gameOver = true
                }
            }
        })
    }
}