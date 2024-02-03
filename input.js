export class InputHandler {
    constructor(game) {
        this.game = game 
        this.keys = []
        window.addEventListener('keydown', (e) => {
            if ((   e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' || 
                    e.key === 'ArrowLeft' || 
                    e.key === 'ArrowRight' ||
                    //e.key === 'Enter' // change to spacebar later
                    e.key === ' '
                ) && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key)
                console.log(e.key)
            }
            if (this.game.gameOver && e.key === 'Enter') {
                location.reload()
            }
            //else if (e.key === 'd') this.game.debug = !this.game.debug
        })
        window.addEventListener('keyup', (e) => {
            if (    e.key === 'ArrowDown'  || 
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === ' ') {
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }
        })
    }
}