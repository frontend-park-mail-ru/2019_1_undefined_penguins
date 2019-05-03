import GameStrategy from '../GameStrategy.js';
export default class SinglePlayerStrategy extends GameStrategy {
    constructor() {
        console.log('SinglePlayerStrategy.fn');
        super();

        this.interval = null;
    }

    readyToStart(payload) {
        this.me = payload.username;
        this.opponent = 'Jhon Snow';
        this.opponentFound(this.me, this.opponent);
        this.startGame();
        this.state = {
            penguinAngle: Math.floor(Math.random()*360),
            piscesAngles: [
                15,
                30,
                45,
            ],
            clockwise: true,
            bullet:{
                destinationFromCenter: 0,
                angle: 0,
            },
            gunAngle: 0,
        };

        this.startGameLoop();
    }

    gameLoop() {
        // if (this.state && this.state.bullets) {
        //     this.state.bullets = this.state.bullets.map(blt => {
        //         switch (blt.dir) {
        //             case 'down': {
        //                 blt.y--;
        //                 if (Math.abs(this.state.me.xpos - blt.x) <= 1) {
        //                     if (Math.abs(this.state.me.ypos - blt.y) <= 1) {
        //                         this.state.me.hp--;
        //                         return null;
        //                     }
        //                 }
        //                 break;
        //             }
        //             case 'up': {
        //                 blt.y++;
        //                 if (Math.abs(this.state.opponent.xpos - blt.x) <= 1) {
        //                     if (Math.abs(this.state.opponent.ypos - blt.y) <= 1) {
        //                         this.state.opponent.hp--;
        //                         return null;
        //                     }
        //                 }
        //                 break;
        //             }
        //         }
        //         if (blt.y > 33 || blt.y < 0) {
        //             return null;
        //         }
        //         return blt;
        //     });
        //     this.state.bullets = this.state.bullets.filter(blt => blt);
        // }

        // if (this.state.me.hp <= 0) {
        //     return this.fireGameOver(`Игра окончена, вы проиграли (${this.me}:${this.state.me.hp} / ${this.opponent}:${this.state.opponent.hp})`);
        // }

        // if (this.state.opponent.hp <= 0) {
        return this.gameOver(`Игра окончена, вы победили (${this.me} / ${this.opponent})`);
        // }

        // this.fireSetNewGameState(this.state);
    }

    startGameLoop() {
        this.interval = setInterval(() => this.gameLoop(), 100);
    }
}