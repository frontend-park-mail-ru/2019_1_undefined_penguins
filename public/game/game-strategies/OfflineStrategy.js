import GameStrategy from '../GameStrategy.js';
import { EVENTS } from '../../utils/events.js';
import Bus from '../../scripts/EventBus.js';

export default class OfflineStrategy extends GameStrategy {
    constructor() {
        // console.log('OfflineStrategy.fn');
        super();

        this.interval = null;
    }

    readyToStart(payload) {
        // console.log('OfflineStrategy.fn.readyToStart', arguments);
        this.me = payload.username;
        this.opponent = 'GUN';
        this.opponentFound(this.me, this.opponent);
        const piscesCount = 24;
        this.sideLength = 100;
        this.state = {
            penguin:{
                alpha: Math.floor(Math.random() * 360),
                clockwise: true,
            },
            piscesAngles: [],
            gun:{
                bullet: {
                    distance_from_center: 0,
                    alpha: 0,
                },
                alpha: 0,
            },
        };
        for (let i = 0; i < piscesCount; i++) {
            this.state.piscesAngles.push((360 / piscesCount) * i);
        }
        this.score = 0;
        this.setNewGameState(this.state);
        this.onStart();

        // this.startGame();
        // this.startGameLoop();
    }

    onStart() {
        const piscesCount = 24;
        this.sideLength = 100;
        this.state = {
            penguin:{
                alpha: Math.floor(Math.random() * 360),
                clockwise: true,
            },
            piscesAngles: [],
            gun:{
                bullet: {
                    distance_from_center: 0,
                    alpha: 0,
                },
                alpha: 0,
            },
        };
        for (let i = 0; i < piscesCount; i++) {
            this.state.piscesAngles.push((360 / piscesCount) * i);
        }
        
        this.score = 0;
        this.startGameLoop();
        this.startGame();
    }


    gameLoop() {
        if (this.state.penguin.alpha === 360) {
            this.state.penguin.alpha = 0;
        }
        if (this.state.penguin.alpha === -1) {
            this.state.penguin.alpha = 359;
        }
        let eaten = -1;
        for (let i = 0; i < this.state.piscesAngles.length; i++) {
            if (this.state.piscesAngles[i] === this.state.penguin.alpha) {
                this.score++;
                // this.scoreElement.innerText = this.score;
                eaten = i;
                break;
            }
        }
        if (eaten !== -1) {
            const angle = this.state.piscesAngles[eaten];
            Bus.emit(EVENTS.EAT_FISH, { angle });
            this.state.piscesAngles.splice(eaten, 1);
            if (this.state.piscesAngles.length === 0) {
                this.onFinishGame();
            }
        }

        //считаем угол пингвина
        if (this.state.penguin.clockwise) {
            this.state.penguin.alpha++;
        } else {
            this.state.penguin.alpha--;
        }

        //считаем пулю и возможное соприкосновение с пингвином
        if (this.state.gun.bullet.distance_from_center > this.sideLength * 0.8 / 2) {
            if (this.state.gun.bullet.alpha % 360 >= this.state.penguin.alpha - 7 && this.state.gun.bullet.alpha % 360 <= this.state.penguin.alpha + 7) {
                // Bus.emit('penguin-injured', this.score);
                Bus.emit(EVENTS.FINISH_THE_GAME);
                Bus.emit('open-lost-view', this.score);
                super.destroy();
                this.stopGameLoop();

                // return;
            }
            if (this.state.penguin.clockwise) {
                this.state.gun.bullet.alpha = this.state.penguin.alpha + Math.floor(Math.random() * 100);
            } else {
                this.state.gun.bullet.alpha = this.state.penguin.alpha - Math.floor(Math.random() * 100);
            }
            this.state.gun.bullet.distance_from_center = 0;

        }
        this.state.gun.bullet.distance_from_center += 5;
        this.setNewGameState(this.state);
    }

    onFinishGame(payload) {
        this.gameOver(payload.message);
    }

    onNewCommand() {
        // console.log('OfflineStrategy.fn.onNewCommand', payload);
        this.state.penguin.clockwise = !this.state.penguin.clockwise;
        // check on SPACE click
        // this.ws.send('newCommand', { name: this.me, command: 'ROTATE' });
    }

    startGameLoop() {
        this.interval = setInterval(() => this.gameLoop(), 70);
    }

    stopGameLoop() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    destroy() {

    }

}