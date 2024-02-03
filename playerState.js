const states = {
    RUNNING: 0, 
    JUMPING: 1,
    FALLING: 2, 
    ROLLING: 3, 
    HIT: 4
}

class State {
    constructor(state, game) {
        this.state = state 
        this.game = game
    }
}

export class Running extends State {
    constructor(game) {
        super('RUNNING', game)
    }
    enter() {
        this.game.player.image = document.getElementById('player_run')
        this.game.player.width = 98
        this.game.player.height = 139
        this.game.player.frameX = 0
        this.game.player.maxFrame = 42
    }
    handleInput(input) {
        if (input.includes('ArrowUp')) {
            this.game.player.setState(states.JUMPING, 1)
        }
        else if (input.includes(' ')) {
            this.game.player.setState(states.ROLLING, 2)
        }
    }
}

export class Jumping extends State {
    constructor(game) {
        super('JUMPING', game)
    }
    enter() {
        if (this.game.player.onGround()) this.game.player.vy -= 27 // 30
        this.game.player.image = document.getElementById('player_jump')
        this.game.player.width = 84
        this.game.player.height = 138
        this.game.player.frameX = 0
        this.game.player.maxFrame = 24
        
    }
    handleInput(input) {
        // falling
        if (this.game.player.vy > this.game.player.weight) {
            this.game.player.setState(states.FALLING, 1)
        }
        else if (input.includes(' ')) {
            this.game.player.setState(states.ROLLING, 2)
        }
    }
}

export class Falling extends State {
    constructor(game) {
        super('FALLING', game)
    }
    enter() {
        this.game.player.image = document.getElementById('player_jump')
        this.game.player.width = 84
        this.game.player.height = 138
        this.game.player.frameX = 0
        this.game.player.maxFrame = 24
    }
    handleInput(input) {
        if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1)
        }
    }
}

export class Rolling extends State {
    constructor(game) {
        super('ROLLING', game) 
    }
    enter() {
        this.game.player.image = document.getElementById('player_roll')
        this.game.player.width = 200
        this.game.player.height = 185
        this.game.player.frameX = 0
        this.game.player.maxFrame = 36
    }
    handleInput(input) {
        if (!input.includes(' ') && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1)
        }
        else if (!input.includes(' ') && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING, 1)
        }
        else if (input.includes('Enter') && input.includes('ArrowUp') && this.game.player.onGround()) {
            this.game.player.vy -= 27
        }
    }
}

export class Hit extends State {
    constructor(game) {
        super('HIT', game)
    }
    enter() {
        this.game.player.image = document.getElementById('player_ko')
        this.game.player.width = 186
        this.game.player.height = 160
        this.game.player.frameX = 0
        this.game.player.maxFrame = 42
        this.game.player.vy = 15 
    }
    handleInput(input) {
        if (this.game.player.frameX >= 42 && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1)
        }
        else if (this.game.player.frameX >= 42 && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING, 2)
        }
    }
}